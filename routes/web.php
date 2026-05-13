<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RsvpController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\SeatAssignmentController;
use App\Http\Controllers\UserController;
use Inertia\Inertia;


Route::inertia('/', 'Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('redirect', fn () => redirect()->route(
        match(auth()->user()->role) {
            'superadmin' => 'sadashboard',
            'admin'      => 'dashboard',
            default      => 'udashboard',
        }
    ))->name('redirect');

    // Super Admin only
    Route::middleware('role:superadmin')->group(function () {
    Route::get('/sadashboard', function () {
        return Inertia::render('SuperAdmin/Dashboard/SADashboard', [
            'stats' => [
                'totalEvents' => \App\Models\Event::count(),
                'totalAdmins' => \App\Models\User::whereIn('role', ['admin', 'superadmin'])->count(),
                'totalUsers'  => \App\Models\User::where('role', 'user')->count(),
                'totalRsvps'  => \App\Models\Rsvp::count(),
            ],
        ]);
    })->name('sadashboard');
    
        // User management
        Route::get('/admin-users', [UserController::class, 'adminList'])->name('admin-users');
        Route::post('/admin-users', [UserController::class, 'store'])->name('admin-users.store');
        Route::post('/admin-users/{user}', [UserController::class, 'update'])->name('admin-users.update');
        Route::post('/admin-users/{user}/deactivate', [UserController::class, 'deactivate'])->name('admin-users.deactivate');
        Route::post('/admin-users/{user}/reactivate', [UserController::class, 'reactivate'])->name('admin-users.reactivate');

        // Assign admin to event
        Route::post('/events/{event}/assign-admin', [EventController::class, 'assignAdmin'])->name('events.assign-admin');
        Route::post('/events/{event}/remove-admin', [EventController::class, 'removeAdmin'])->name('events.remove-admin');
    });

    // Admin + Super Admin shared 
    Route::middleware('role:admin,superadmin')->group(function () {
        Route::get('/events', [EventController::class, 'index'])->name('events');
        Route::post('/events', [EventController::class, 'store']);
        Route::post('/events/{id}', [EventController::class, 'update']);
        Route::post('/events/{event}/delete', [EventController::class, 'delete']);

        Route::get('/rsvp', [RsvpController::class, 'index'])->name('rsvp');

        Route::get('/seats', [SeatController::class, 'adminIndex'])->name('seat-management');
        Route::get('/events/{event}/seats', [SeatController::class, 'index'])->name('seats');

        Route::inertia('dashboard', 'Admin/Dashboard/ADashboard')->name('dashboard');
        Route::inertia('add-events', 'Admin/Event/ACreateEvent')->name('add-events');
    });

    // User only
    Route::middleware('role:user')->group(function () {
        Route::post('/rsvp', [RsvpController::class, 'store'])->name('rsvp.store');
        Route::get('/uevents', [EventController::class, 'userIndex'])->name('uevents');
        Route::post('/rsvp/{rsvpID}/cancel', [RsvpController::class, 'cancel'])->name('rsvp.cancel');
        Route::get('/events/{event}/select-seat', [SeatController::class, 'userSeatSelect'])->name('seat.select');

        Route::inertia('udashboard', 'User/Dashboard/UDashboard')->name('udashboard');
    });
});

require __DIR__.'/settings.php';
