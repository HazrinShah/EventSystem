<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SeatAssignment;
use App\Models\Rsvp;
use App\Models\Seat;

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

    return response()->json([
        'message' => 'Seat assigned successfully',
        'seatAssignment' => $seatAssignment,
    ], 201); // 201 code untuk created
    }
}
