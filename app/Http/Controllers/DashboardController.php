<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use App\Models\Rsvp;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request){
        $user = $request->user();

        if($user->role ==='superadmin'){
            $rsvpsData = Rsvp::with('event:eventID,title')
                ->select('rsvpID', 'eventID', 'status', 'pax', 'created_at')
                ->orderBy('created_at', 'asc')
                ->get()
                ->map(function ($rsvp) {
                    return [
                        'rsvpID' => $rsvp->rsvpID,
                        'eventID' => $rsvp->eventID,
                        'eventTitle' => $rsvp->event?->title ?? 'Unknown Event',
                        'status' => $rsvp->status,
                        'pax' => $rsvp->pax ?? 1,
                        'date' => $rsvp->created_at ? $rsvp->created_at->toDateString() : null,
                    ];
                });

            $eventsList = Event::select('eventID', 'title')->get();

            $usersData = User::select('userID', 'role', 'created_at')
                ->orderBy('created_at', 'asc')
                ->get()
                ->map(function ($u) {
                    return [
                        'userID' => $u->userID,
                        'role' => $u->role,
                        'date' => $u->created_at ? $u->created_at->toDateString() : null,
                    ];
                });

            return Inertia::render('SuperAdmin/Dashboard/SADashboard', [
                'stats' => [
                    'totalEvents' => Event::count(),
                    'totalAdmins' => User::whereIn('role', ['admin', 'superadmin'])->count(),
                    'totalUsers'  => User::where('role', 'user')->count(),
                    'totalRsvps'  => Rsvp::count(),
                ],
                'rsvpsData' => $rsvpsData,
                'eventsList' => $eventsList,
                'usersData' => $usersData,
            ]);
        }

        if($user->role === 'admin'){
            $eventsList = Event::where('created_by', $user->userID)
                ->orWhereHas('assignedAdmins', fn($q) => $q->where('event_admins.userID', $user->userID))
                ->orWhereHas('creator', fn($q) => $q->where('role', 'user'))
                ->select('eventID', 'title')
                ->get();
                
            $eventIDs = $eventsList->pluck('eventID');

            $rsvpsData = Rsvp::with('event:eventID,title')
                ->whereIn('eventID', $eventIDs)
                ->select('rsvpID', 'eventID', 'status', 'pax', 'created_at')
                ->orderBy('created_at', 'asc')
                ->get()
                ->map(function ($rsvp) {
                    return [
                        'rsvpID' => $rsvp->rsvpID,
                        'eventID' => $rsvp->eventID,
                        'eventTitle' => $rsvp->event?->title ?? 'Unknown Event',
                        'status' => $rsvp->status,
                        'pax' => $rsvp->pax ?? 1,
                        'date' => $rsvp->created_at ? $rsvp->created_at->toDateString() : null,
                    ];
                });

            return Inertia::render('Admin/Dashboard/ADashboard', [
                'stats'=> [
                    'myEvents' => $eventsList->count(),
                    'totalRsvps' => Rsvp::whereIn('eventID', $eventIDs)->count(),
                    'pendingRsvps' => Rsvp::where('status', 'pending')->whereIn('eventID', $eventIDs)->count(),
                    'confirmedRsvps' => Rsvp::where('status', 'confirmed')->whereIn('eventID', $eventIDs)->count(),
                ],
                'rsvpsData' => $rsvpsData,
                'eventsList' => $eventsList,
            ]);
        }

        if($user->role === 'user'){
            return Inertia::render('User/Dashboard/UDashboard', [
                'stats' => [
                    'totalBooked' => Rsvp::where('userID', $user->userID)->count(),
                    'upcomingEvents' => Event::whereHas('rsvps', function($query) use ($user){
                        $query->where('userID', $user->userID);
                    })->where('start_date', '>', now())->take(5)->get(),
                ],
            ]);
        }
    
}
}
