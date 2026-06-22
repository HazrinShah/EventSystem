<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventProposal;
use Inertia\Inertia;

class OrganizerController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        
        if (!$user->is_active_organizer) {
            abort(403, 'Unauthorized. You are not an active organizer.');
        }

        // amik event yg created by this organizer
        $events = Event::withCount('rsvps')->where('created_by', $user->userID)->latest()->get();

        return Inertia::render('Organizer/Dashboard/ODashboard', [
            'events' => $events
        ]);
    }

    public function eventManage($eventID)
    {
        $user = auth()->user();
        if (!$user->is_active_organizer) {
            abort(403, 'Unauthorized. You are not an active organizer.');
        }

        // find event n make sure organizer ni punya
        $event = Event::with(['rsvps.user'])->where('created_by', $user->userID)->findOrFail($eventID);

        return Inertia::render('Organizer/Event/OEventManage', [
            'event' => $event
        ]);
    }

    public function events()
    {
        $user = auth()->user();
        if (!$user->is_active_organizer) abort(403);
        $events = Event::withCount('rsvps')->where('created_by', $user->userID)->latest()->get();
        return Inertia::render('Organizer/Event/OEventIndex', ['events' => $events]);
    }

    public function rsvps()
    {
        $user = auth()->user();
        if (!$user->is_active_organizer) abort(403);
        $rsvps = \App\Models\Rsvp::with(['user', 'event'])
            ->whereHas('event', function($query) use ($user) {
                $query->where('created_by', $user->userID);
            })->latest()->get();
            
        return Inertia::render('Organizer/Rsvp/ORsvpIndex', ['rsvps' => $rsvps]);
    }

    public function cancelRsvp($rsvpID)
    {
        $user = auth()->user();
        if (!$user->is_active_organizer) abort(403);
        
        $rsvp = \App\Models\Rsvp::with(['event', 'seatAssignments'])->findOrFail($rsvpID);
        
        // rsvp belong to event dicipta oleh organizer ni
        if ($rsvp->event->created_by !== $user->userID) {
            abort(403, 'Unauthorized action.');
        }

        // Release seats
        foreach ($rsvp->seatAssignments as $assignment) {
            \App\Models\Seat::where('seatID', $assignment->seatID)
                ->update([
                    'status'      => 'available',
                    'selected_by' => null,
                    'selected_at' => null,
                ]);
        }

        $rsvp->seatAssignments()->delete();
        $rsvp->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
        ]);

        return back()->with('success', 'RSVP has been cancelled.');
    }

    public function seats()
    {
        $user = auth()->user();
        if (!$user->is_active_organizer) abort(403);
        // dia akan kira seat based on event id and map
        $events = Event::withCount('seats')
            ->where('created_by', $user->userID)
            ->get()->map(function ($event){
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

        return Inertia::render('Organizer/Seat/OSeatIndex', ['events' => $events]);
    }

    public function seatManage(Event $event)
    {
        $user = auth()->user();
        if (!$user->is_active_organizer) abort(403);
        if ($event->created_by !== $user->userID) abort(403);

        $seats = $event->seats()->get()->map(function ($seat) {
            return [ 
                'seatID' => $seat->seatID,
                'label' => $seat->label,
                'x_percent' => $seat->x_percent,
                'y_percent' => $seat->y_percent,
                'status' => $seat->isSelectionExpired() ? 'available' : $seat->status,
            ];
        });

        return Inertia::render('Organizer/Seat/OSeatManage', [
            'event' => $event,
            'seats' => $seats,
        ]);
    }
}
