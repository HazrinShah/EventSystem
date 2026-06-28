<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RsvpController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\SeatAssignmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventProposalController;
use App\Http\Controllers\AdminProposalController;
use Inertia\Inertia;


Route::inertia('/', 'Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {

    // for all user
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/history', [EventController::class, 'history'])->name('events.history');
    Route::post('/rsvp/{rsvpID}/cancel', [RsvpController::class, 'cancel'])->name('rsvp.cancel');

    Route::get('redirect', function () {
        return redirect()->route('dashboard');
    })->name('redirect');

    // Super Admin only
    Route::middleware('role:superadmin')->group(function () {

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
        // Proposals (Approve/Reject)
        Route::get('/admin/proposals', [AdminProposalController::class, 'index'])->name('admin.proposals.index');
        Route::post('/admin/proposals/{proposal}/approve', [AdminProposalController::class, 'approve'])->name('admin.proposals.approve');
        Route::post('/admin/proposals/{proposal}/reject', [AdminProposalController::class, 'reject'])->name('admin.proposals.reject');
        Route::get('/events', [EventController::class, 'index'])->name('events');
        Route::post('/events', [EventController::class, 'store']);
        Route::post('/events/{id}', [EventController::class, 'update']);
        Route::post('/events/{event}/delete', [EventController::class, 'delete']);

        Route::get('/rsvp', [RsvpController::class, 'index'])->name('rsvp');

        Route::get('/seats', [SeatController::class, 'adminIndex'])->name('seat-management');
        Route::get('/events/{event}/seats', [SeatController::class, 'index'])->name('seats');

        Route::inertia('add-events', 'Admin/Event/ACreateEvent')->name('add-events');
    });

    // User only
    Route::middleware('role:user')->group(function () {
        Route::post('/rsvp', [RsvpController::class, 'store'])->name('rsvp.store');
        Route::get('/uevents', [EventController::class, 'userIndex'])->name('uevents');
        Route::get('/events/{event}/select-seat', [SeatController::class, 'userSeatSelect'])->name('seat.select');
        Route::get('/events/{event}/seat-view', [SeatController::class, 'userSeatView'])->name('seat.view');
        Route::get('/my-rsvps', [RsvpController::class, 'userIndex'])->name('my-rsvps');
        Route::get('/my-proposals', [EventProposalController::class, 'index'])->name('user.proposals.index');
        Route::get('/my-proposals/create', [EventProposalController::class, 'create'])->name('user.proposals.create');
        Route::post('/my-proposals', [EventProposalController::class, 'store'])->name('user.proposals.store');
    });

    // Organizer Mode
    Route::middleware(['auth'])->prefix('organizer')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\OrganizerController::class, 'dashboard'])->name('organizer.dashboard');
        Route::get('/events', [\App\Http\Controllers\OrganizerController::class, 'events'])->name('organizer.events');
        Route::post('/events/{id}', [EventController::class, 'update']);
        Route::post('/events/{event}/delete', [EventController::class, 'delete']);
        Route::get('/rsvps', [\App\Http\Controllers\OrganizerController::class, 'rsvps'])->name('organizer.rsvps');
        Route::post('/rsvps/{rsvpID}/cancel', [\App\Http\Controllers\OrganizerController::class, 'cancelRsvp']);
        Route::get('/seats', [\App\Http\Controllers\OrganizerController::class, 'seats'])->name('organizer.seats');
        Route::get('/events/{event}/seats', [\App\Http\Controllers\OrganizerController::class, 'seatManage'])->name('organizer.seats.manage');
        Route::get('/events/{event}', [\App\Http\Controllers\OrganizerController::class, 'eventManage'])->name('organizer.event.manage');
    });
});

require __DIR__.'/settings.php';
