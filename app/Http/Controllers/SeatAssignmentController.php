<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SeatAssignment;
use App\Models\Rsvp;

class SeatAssignmentController extends Controller
{
    // assign seat to rsvp

    public function store(Request $request){
        $validated = $request->validate([
            'seatID'=>'required|exists:seats,seatID',
            'rsvpID' => 'required|exists:rsvps,rsvpID',
        ]);

    // check if seat tu dah ada assignment ke user lain
    $assignedSeat = SeatAssignment::where('seatID', $validated['seatID'])->exists();

    if($assignedSeat){
        return response()->json([
            'message' => 'Seat already assigned to another user',
        ], 400); // 400 code untuk bad request
    }

    // check if rsvp tu dah ada seat assignment ke seat lain
    $assignedRSVP = SeatAssignment::where('rsvpID', $validated['rsvpID'])->exists();

    if($assignedRSVP){
        return response()->json([
            'message' => 'RSVP already assigned to another seat',
        ], 422); // 422 code untuk unprocessable entity
    }


    // kalau dua-dua check tu clear, baru create seat assignment

    $seatAssignment = SeatAssignment::create($validated);

    // lepas tu update status RSVP tu jadi 'assigned' untuk bagi tau user dia dah dapat seat

    Rsvp::where('rsvpID', $validated['rsvpID'])->update(['status' => 'confirmed']);

    return response()->json([
        'message' => 'Seat assigned successfully',
        'seatAssignment' => $seatAssignment,
    ], 201); // 201 code untuk created



    }
}
