<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SeatAssignment;
use App\Models\Rsvp;
use App\Models\Seat;
use Illuminate\Support\Facades\Http;

class SeatAssignmentController extends Controller
{
    // assign seat to rsvp

    public function store(Request $request){
        $validated = $request->validate([
            'seatID'=>'required|exists:seats,seatID',
            'rsvpID' => 'required|exists:rsvps,rsvpID',
        ]);

    // check if seat tu dah ada assignment ke user lain
    $seatAlreadyAssigned = SeatAssignment::where('seatID', $validated['seatID'])->exists();

    if($seatAlreadyAssigned){
        return response()->json([
            'message' => 'Seat already assigned to another user',
        ], 400); // 400 code untuk bad request
    }

    // create seat assignment
    $seatAssignment = SeatAssignment::create($validated);

    // update data seat tu jadi booked
    Seat::where('seatID', $validated['seatID'])->update([
        'status' => 'booked',
        'selected_by' => null,
        'selected_at' => null,
    ]);

    // lepas tu update status RSVP tu jadi 'assigned' untuk bagi tau user dia dah dapat seat
    Rsvp::where('rsvpID', $validated['rsvpID'])->update(['status' => 'confirmed']);

    // automation n8n
    // ambil data rsvp sekali dengan user, event dan seat
    $rsvp = Rsvp::with(['user','event', 'seatAssignments.seat'])->findOrFail($validated['rsvpID']);

    // hantar email kalau dah pilih semua seat based on pax dia je
    // check sama ada jumlah seat assignments sama dengan pax
    if ($rsvp->seatAssignments()->count() === (int)$rsvp->pax) {
        
     // Satukan senarai label seat jadi satu string (contoh: "A1, A2, A3")
     $seatLabels = $rsvp->seatAssignments
                ->map(fn($assign) => $assign->seat?->label)
                ->filter()
                ->values()
                ->toArray();
            $webhookUrl = env('N8N_WEBHOOK_URL');

                if ($webhookUrl) {
                // Tembak webhook n8n secara Background (timeout 2 saat)
                try {
                    Http::timeout(2)->post($webhookUrl, [
                        'rsvpID'       => $rsvp->rsvpID,
                        'user_name'    => $rsvp->user->name,
                        'user_email'   => $rsvp->user->email,
                        'event_title'  => $rsvp->event->title,
                        'event_date'   => $rsvp->event->start_date,
                        'event_time'   => $rsvp->event->start_time,
                        'location'     => $rsvp->event->location,
                        'pax'          => $rsvp->pax,
                        'seats'        => implode(', ', $seatLabels),
                    ]);
                } catch (\Exception $e) {
                    // Fail silently supaya app tak crash jika n8n down
                    logger()->error('N8N Webhook Fail: ' . $e->getMessage());
                }
            }
        

    }
    return response()->json([
        'message' => 'Seat assigned successfully',
        'seatAssignment' => $seatAssignment,
    ], 201); // 201 code untuk created
    }
}

