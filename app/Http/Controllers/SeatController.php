<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeatController extends Controller
{

    public function index(Event $event){
        $seats = $event->seats()->with('seatAssignments')->get()->map(function ($seat) {
            return [ 
                'seatID' => $seat->seatID,
                'label' => $seat->label,
                'x_percent' => $seat->x_percent,
                'y_percent' => $seat->y_percent,
                'is_booked' => $seat->seatAssignments()->exists(),
            ];
        });

        $rsvps = $event->rsvps()->with('user')->where('status', 'pending')->get();

        return Inertia::render('ASeat', [
            'event' => $event,
            'seats' => $seats,
            'rsvps' => $rsvps,
        ]);
    }


    public function store(Request $request){
        $validated = $request->validate([
            'eventID' => 'required|exists:events,eventID',
            'label' => 'required|string|max:255',
            'x_percent' => 'required|numeric|min:0|max:100',
            'y_percent' => 'required|numeric|min:0|max:100',
        ]);

        $seat = Seat::create($validated); // command untuk create seat baru n store kat db. tapi kena call $seat sebab command ni store dlm tu

        return response()->json([
            'message' => 'Seat created successfully',
            'seat' => [
                'seatID' => $seat->seatID,
                'label' => $seat->label,
                'x_percent' => $seat->x_percent,
                'y_percent' => $seat->y_percent,
                'eventID' => $seat->eventID,
                'is_booked' => false, // baru create mestilah belum booked
            ],
        ], 201);// 201 ni code untuk created
    }

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

}
