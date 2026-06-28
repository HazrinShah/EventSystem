<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeatController extends Controller
{

// ni untuk admin nampak semua event dengan seat count dia sekali, then boleh click untuk manage seat bagi event tu
    public function adminIndex(Request $request){

     $user = $request->user();
     // dia akan kira seat based on event id and map
     // map ni loop tau, $event tu variable yg kau create untuk loop data yang ade dalam $events
     $query = Event::withCount('seats');
     // Ambil nama relationship (dalam kes kau: seats).
     // Tambah suffix _count di belakangnya.
      if ($user->role !== 'superadmin') {
        $query->where(function ($q) use ($user) {
            $q->where('created_by', $user->userID)
              ->orWhereHas('assignedAdmins', fn($q2) => $q2->where('event_admins.userID', $user->userID))
              ->orWhereHas('creator', fn($q2) => $q2->where('role', 'user'));
        });
    }

    $events = $query->get()->map(function ($event){

    $seatCount = $event->seats_count;
    $hasSeats = $seatCount > 0;

     return [
            'eventID' => $event->eventID,
            'title' => $event->title,
            'layoutImage' => $event->layoutImage,
            'seat_limit' => $event->seat_limit,
            'seat_count' => $seatCount,
            'has_seats' => $hasSeats,
            'status' => $hasSeats ? 'Seats Added' : 'No Seats',
        ];
    });
    return Inertia::render('Admin/Seat/ASeatManagement', [
        'events' => $events,
    ]);

    }

    
    // Event $ event ni dia create obj $event daripada model Event
    public function index(Event $event){
        // seats() ni ralationship yg dalam Event model tu.
        $seats = $event->seats()->get()->map(function ($seat) {
            return [ 
                'seatID' => $seat->seatID,
                'label' => $seat->label,
                'x_percent' => $seat->x_percent,
                'y_percent' => $seat->y_percent,
                'status' => $seat->isSelectionExpired() ? 'available' : $seat->status,
                // line ni cek seat dah expired ke belum, kalau dah dia render available
                // kalau belum dia tunjuk status sebenar ( $seat->status )
            ];
        });

        return Inertia::render('Admin/Seat/ASeat', [
            'event' => $event,
            'seats' => $seats,
        ]);
    }

    public function userSeatView(Event $event, Request $request)
    {
        $userID = $request->user()->userID;

        // cek user ada RSVP untuk event ni (tapis rsvp yang aktif sahaja)
        $rsvp = $event->rsvps()
            ->where('userID', $userID)
            ->where('status', '!=', 'cancelled')
            ->first();

        if (!$rsvp) {
            return redirect('/my-rsvps');
        }

        // release expired selections
        $event->seats()->where('status', 'selected')->get()->each->releaseIfExpired();

        $seats = $event->seats()->get()->map(fn($seat) => [
            'seatID'    => $seat->seatID,
            'label'     => $seat->label,
            'x_percent' => $seat->x_percent,
            'y_percent' => $seat->y_percent,
            'status'    => $seat->status,
            'is_mine'   => (int) $seat->selected_by === (int) $userID,
        ]);

        return Inertia::render('User/Seat/USeatView', [
            'event' => $event,
            'seats' => $seats,
            'rsvp'  => [
                'rsvpID'     => $rsvp->rsvpID,
                'pax'        => $rsvp->pax,
                'status'     => $rsvp->status,
                'seat_label' => $rsvp->seatAssignments()->with('seat')->get()
                                    ->map(fn($a) => $a->seat?->label)
                                    ->filter()->values(),
            ],
        ]);
    }

    public function userSeatSelect(Event $event, Request $request) 
    {
        $userID = $request->user()->userID;

        // cek kalau user ni ada RSVP pending untuk event ni, kalau ada baru dia boleh select seat
        $rsvp = $event->rsvps()->where('userID', $userID)->where('status', 'pending')->first();

        if (!$rsvp) {
            return redirect('/uevents')->withErrors([
                'seat' => 'You must have a pending RSVP to select a seat for this event.',
            ]);
        }

        // cari seat yang selected, kalau expired release sebab kita panggil func releaseifexpired tu
        $event->seats()->where('status', 'selected')->get()->each->releaseIfExpired();

        $seats = $event->seats()->get()->map(fn($seat) => [
            'seatID' => $seat->seatID,
            'label' => $seat->label,
            'x_percent' => $seat->x_percent,
            'y_percent' => $seat->y_percent,
            'status' => $seat->status,
            // casting sbb nak elakkan error kalau db sent data dalam string
            'is_mine' => (int) $seat->selected_by === (int) $userID,
            // tukar format tarikh kepada std global so js kat frontend bole buat timer countdown dengan mudah
            'expires_at' => ($seat->status === 'selected' && (int) $seat->selected_by === (int) $userID && $seat->selected_at)
            ? $seat->selected_at->addMinutes(Seat::SELECTION_TIMEOUT_MINUTES)->toISOString()
            : null,
            // null sebab kalau seat tu ksong atau orang lain punya, we dont need to know when it will expire
        ]);

        return Inertia::render('User/Seat/USeatSelect', [
            'event' => $event,
            'seats' => $seats,
            'rsvp' => $rsvp,
        ]);
    }

    // API create seat
    public function store(Request $request){
        $validated = $request->validate([
            'eventID' => 'required|exists:events,eventID',
            'label' => 'required|string|max:255',
            'x_percent' => 'required|numeric|min:0|max:100',
            'y_percent' => 'required|numeric|min:0|max:100',
        ]);

        $event = Event::findOrFail($validated['eventID']);

        // cek label dah wujud untuk event ni ke belum
        $labelExists = $event->seats()->whereRaw('LOWER(label) = ?', [strtolower($validated['label'])])->exists();
        if ($labelExists) {
            return response()->json([
                'message' => "Seat label \"{$validated['label']}\" already exists for this event.",
            ], 422);
        }

        // bilangan kerusi yg dah ade
        $currentCount = $event->seats()->count();

        if($event->seat_limit > 0 && $currentCount >= $event->seat_limit){
            return response()->json([
                'message' => "Seat limit reached, ({$event->seat_limit} seats allowed)",
            ], 422);
        }

        $seat = Seat::create($validated); // command untuk create seat baru n store kat db. tapi kena call $seat sebab command ni store dlm tu

        return response()->json([
            'message' => 'Seat created successfully',
            'seat' => [
                'seatID' => $seat->seatID,
                'label' => $seat->label,
                'x_percent' => $seat->x_percent,
                'y_percent' => $seat->y_percent,
                'eventID' => $seat->eventID,
                'status' => 'available',
                'is_mine' => false, 
                // sebab ni untuk admin, so dia takde seat yang dia select, 
                // nanti bila kau buat func untuk user select seat, baru kau set is_mine tu ikut userID yang login tu
            ],
        ], 201);// 201 ni code untuk created
    }

    // API delete seat 
    public function destroy(Seat $seat){
        if($seat->isBooked()){
            return response()->json([
                'message' => 'Seat is already booked',
            ], 400);
        }
        $seat->delete();

        return response()->json([
            'message' => 'Seat deleted successfully',
        ]);
    }

    // API delete all seats for an event
    public function destroyAll(Event $event){
        if($event->seats()->where('status', 'booked')->exists()){
            return response()->json([
                'message' => 'Cannot delete seats, some seats are already booked',
            ], 400);
        }
        $event->seats()->delete();
        return response()->json([
            'message' => 'All seats deleted successfully',
        ]);
    }

    // API select seat temporary (user)
    public function selectSeat(Request $request, Seat $seat)
    {
        // cek sape user 
        $userID = $request->user()->userID;

        // Release expired selections first
        $seat->releaseIfExpired();
        $seat->refresh();

        if ($seat->status !== 'available') {
            return response()->json(['message' => 'Seat is not available.'], 409);
        }

        // cek user rsvp untuk dapatkan pax count, kalau dia takde rsvp dia tak boleh select seat
        $rsvp = \App\Models\Rsvp::where('userID', $userID)
            ->where('eventID', $seat->eventID)
            ->where('status', 'pending')
            ->first();

        if (!$rsvp) {
            return response()->json(['message' => 'You must have a pending RSVP to select a seat for this event.'], 403);
        }

        $currentlySelected = Seat::where('eventID', $seat->eventID)
                                ->where('selected_by', $userID)
                                ->where('status', 'selected')
                                ->count();
        
        // kira berapa seat yang user tu dah select
        // kalau dah sampai limit pax dia dalam rsvp
        // dia tak boleh select seat lagi, kena release dulu baru boleh select seat lain
        if ($currentlySelected >= $rsvp->pax) {
            return response()->json([
            'message' => "You can only select up to {$rsvp->pax} seats based on your RSVP."
            ], 422);
        }

        // update seat tu jadi selected drpd avilable, set selected_by dengan userID, set selected_at dengan current timestamp
        $seat->update([
            'status' => 'selected',
            'selected_by' => $userID,
            'selected_at' => now(),
        ]);


        $newCount = $currentlySelected + 1;
        
        return response()->json([
            'message'    => "Seat \"{$seat->label}\" selected. ({$newCount}/{$rsvp->pax})",
            'expires_at' => now()->addMinutes(\App\Models\Seat::SELECTION_TIMEOUT_MINUTES)->toISOString(),
            'selected'   => $newCount,
            'pax'        => $rsvp->pax,
        ]);
    }

            public function releaseSeat(Request $request, Seat $seat){

            // check seat tu user punya ke bukan, kalau bukan takleh
            $userID = $request->user()->userID;
            if ((int) $seat->selected_by !== (int) $userID) {
                return response()->json(['message' => 'You cannot release this seat.'], 403);
            }

            // cek seat selected ke tak, kalau tak takleh
            if ((int) $seat->status !== (int) 'selected') {
                return response()->json(['message' => 'Seat is not selected.'], 409);
            }

            // update status la sng cakap bagi available semula
            $seat->update([
                'status' => 'available',
                'selected_by' => null,
                'selected_at' => null,
            ]);
            
            return response()->json(['message' => "Seat \"{$seat->label}\" released."]);

            }

            // poll every 5 sec — returns status only (for user seat select/view)
            public function statusPoll(Event $event, Request $request)
            {
                $userID = $request->user()->userID;
                $event->seats()->where('selected_by', $userID)->get()->each->releaseIfExpired();

                $seats = $event->seats()->get()->map(fn($seat) => [
                    'seatID'     => $seat->seatID,
                    'status'     => $seat->status,
                    'is_mine'    => (int) $seat->selected_by === (int) $userID,
                    'expires_at' => ($seat->status === 'selected' && (int) $seat->selected_by === (int) $userID && $seat->selected_at)
                    ? $seat->selected_at->addMinutes(Seat::SELECTION_TIMEOUT_MINUTES)->toISOString()
                    : null,
                ]);

                return response()->json(['seats' => $seats]);
            }

            // poll for admin — returns full seat data including coordinates and new seats
            public function adminStatusPoll(Event $event)
            {
                $seats = $event->seats()->get()->map(fn($seat) => [
                    'seatID'    => $seat->seatID,
                    'label'     => $seat->label,
                    'x_percent' => $seat->x_percent,
                    'y_percent' => $seat->y_percent,
                    'status'    => $seat->isSelectionExpired() ? 'available' : $seat->status,
                ]);

                return response()->json(['seats' => $seats]);
            }




        
}
