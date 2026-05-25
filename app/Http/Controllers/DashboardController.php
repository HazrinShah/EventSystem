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
        return Inertia::render('SuperAdmin/Dashboard/SADashboard', [

                'stats' => [
                    'totalEvents' => Event::count(),
                    'totalAdmins' => User::whereIn('role', ['admin', 'superadmin'])->count(),
                    'totalUsers'  => User::where('role', 'user')->count(),
                    'totalRsvps'  => Rsvp::count(),
                ],
            ]);
        }

        if($user->role === 'admin'){
            return Inertia::render('Admin/Dashboard/ADashboard', [
                'stats'=> [
                    'myEvents' => Event::where('created_by', $user->userID)->count(),
                    'totalRsvps' => Rsvp::whereHas('event', function($query) use ($user){
                        $query->where('created_by', $user->userID);
                    })->count(),
                ],
            ]);
        }

        if($user->role === 'user'){
            return Inertia::render('User/Dashboard/UDashboard', [
                'stats' => [
                    'totalBooked' => Rsvp::where('userID', $user->userID)->count(),
                    'upcomingEvents' => Event::whereHas('rsvps', function($query) use ($user){
                        $query->where('userID', $user->userID);
                    })->where('date', '>', now())->take(5)->get(),
                ],
            ]);
        }
    
}
}
