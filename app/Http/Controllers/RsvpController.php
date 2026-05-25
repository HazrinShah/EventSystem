<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Rsvp;
use Illuminate\Http\Request;

// ade store utk user submit rsvp. index untuk admin tgok rsvp 

class RsvpController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'eventID' => 'required|exists:events,eventID',
            'pax' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ]);

        // check duplicate — user dah RSVP event ni ke belum
        // check current use logged in n amik userid dia
        $exists = Rsvp::where('userID', $request->user()->userID)
                    // check ade tak userid tu kat dalam event id ni
                    ->where('eventID', $validated['eventID'])
                    // kalau exist true, kalau takde false
                    ->exists();

        if ($exists) {
            return back()->withErrors(['rsvp' => 'You have already RSVP\'d for this event.']);
        }

        Rsvp::create([
            // 3 dot tu dia gabungkan validated punya isi dgn 2 baru kat bawah ni
            ...$validated,
            'userID' => $request->user()->userID,
            'status' => 'pending',
        ]);

        return redirect()->route('seat.select', ['event' => $validated['eventID']]);
    }

    public function index(Request $request)
    {
        $user = $request->user();

        // 1. Panggil query RSVP berserta user, event dan seat assignments
        $query = Rsvp::with(['user', 'event', 'seatAssignments.seat']);

        // 2. Jika login sebagai admin biasa, tapis event miliknya sahaja
        if ($user->role === 'admin') {
            $query->whereHas('event', function ($q) use ($user) {
                $q->where('created_by', $user->userID)
                  ->orWhereHas('assignedAdmins', fn($q2) => $q2->where('event_admins.userID', $user->userID));
            });
        }

        // 3. Compile dan hantar data dengan format yang sama seperti userIndex
        $rsvps = $query->get()->map(fn($rsvp) => [
            'rsvpID'     => $rsvp->rsvpID,
            'pax'        => $rsvp->pax,
            'note'       => $rsvp->note,
            'status'     => $rsvp->status,
            'user'       => [
                'name' => $rsvp->user?->name ?? 'Unknown User',
            ],
            'seat_label' => $rsvp->seatAssignments->map(fn($assignment) 
                => $assignment->seat?->label)->filter()->values(),
            'event'      => [
                'eventID' => $rsvp->event->eventID,
                'title'   => $rsvp->event->title,
            ],
        ]);

        return Inertia::render('Admin/Rsvp/ARsvp', ['rsvps' => $rsvps]);
    }


    public function userIndex(Request $request)
    {
        $userID = $request->user()->userID;

        $rsvps = Rsvp::with(['event', 'seatAssignments.seat'])
        ->where('userID', $userID)->latest()->get()
        ->map(fn($rsvp) => [
            'rsvpID'     => $rsvp->rsvpID,
            'pax'        => $rsvp->pax,
            'note'       => $rsvp->note,
            'status'     => $rsvp->status,
            'seat_label' => $rsvp->seatAssignments->map(fn($assignment) 
            => $assignment->seat?->label)->filter()->values(),
            'event'      => [
                'eventID'     => $rsvp->event->eventID,
                'title'       => $rsvp->event->title,
                'date'        => $rsvp->event->date,
                'time'        => $rsvp->event->time,
                'location'    => $rsvp->event->location,
                'layoutImage' => $rsvp->event->layoutImage,
                'has_seats'   => $rsvp->event->seats()->exists(),
            ],
        ]);

        return Inertia::render('User/Rsvp/URsvp', ['rsvps' => $rsvps]);
    }

    public function cancel(Request $request, $rsvpID)
    {
        $rsvp = Rsvp::with(['event', 'seatAssignments'])->findOrFail($rsvpID);
        $user = $request->user();

        // Only allow cancellation if:
        // 1. The user is a superadmin
        // 2. The user is the owner of the RSVP
        // 3. The user is an admin who created the event or is assigned to the event
        if ($user->role === 'user') {
            if ($rsvp->userID !== $user->userID) {
                abort(403, 'Unauthorized action.');
            }
        } elseif ($user->role === 'admin') {
            $event = $rsvp->event;
            $isCreator = $event && $event->created_by === $user->userID;
            $isAssigned = $event && $event->assignedAdmins()->where('event_admins.userID', $user->userID)->exists();

            if (!$isCreator && !$isAssigned) {
                abort(403, 'Unauthorized action.');
            }
        } elseif ($user->role !== 'superadmin') {
            abort(403, 'Unauthorized action.');
        }

        // release all booked seats back to available before deleting
        foreach ($rsvp->seatAssignments as $assignment) {
            \App\Models\Seat::where('seatID', $assignment->seatID)
                ->update([
                    'status'      => 'available',
                    'selected_by' => null,
                    'selected_at' => null,
                ]);
        }

        // seatAssignments will cascade-delete via FK when rsvp is deleted
        $rsvp->delete();

        return back();
    }

    public function getTomorrowReminders(\Illuminate\Http\Request $request){
        // 1. check token dari header request n8n
        $token = $request->header('X-N8N-TOKEN');
        if(!$token || $token !== env('N8N_API_TOKEN')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // 2. retrieve tarikh esok
        $tomorrow = now()->addDay()->toDateString();

        // 3. cari rsvp yang confirmed pada hari esok
        $rsvps = Rsvp::with('user', 'event', 'seatAssignments.seat')
        ->where('status', 'confirmed')
        ->whereHas('event', function ($query) use ($tomorrow){
            $query->where('date', $tomorrow);
        })
        ->get()
        ->map(function ($rsvp) {
            // 1. amik seat label
            $seatLabels = $rsvp->seatAssignments->map(fn($assign) => $assign->seat?->label)
            ->filter()->values()->toArray();

            return [
                    'rsvpID'       => $rsvp->rsvpID,
                    'user_name'    => $rsvp->user->name,
                    'user_email'   => $rsvp->user->email,
                    'event_title'  => $rsvp->event->title,
                    'event_date'   => $rsvp->event->date,
                    'event_time'   => $rsvp->event->time,
                    'location'     => $rsvp->event->location,
                    'pax'          => $rsvp->pax,
                    'seats'        => implode(', ', $seatLabels),
                ];
            
        });
        return response()->json($rsvps);
    }


}
