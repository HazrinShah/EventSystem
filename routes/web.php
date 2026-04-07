<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RsvpController;

Route::inertia('/', 'Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

//admin n user 
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('redirect', fn () => redirect()->route(
        auth()->user()->role === 'admin' ? 'dashboard' : 'udashboard'
    ))->name('redirect');

    // admin page route
    Route::middleware('role:admin')->group(function () {
        Route::post('/events', [EventController::class, 'store']);
        Route::get('/events', [EventController::class, 'index'])->name('events');
        Route::post('/events/{id}', [EventController::class, 'update']);
        Route::post('/events/{event}/delete', [EventController::class, 'delete']);
        Route::get('/rsvp', [RsvpController::class, 'index'])->name('rsvp');
        
        Route::inertia('dashboard', 'ADashboard')->name('dashboard');
        Route::inertia('add-events', 'ACreateEvent')->name('add-events');
    });

    // user page route
    Route::middleware('role:user')->group(function () {
        Route::post('/rsvp', [RsvpController::class, 'store'])->name('rsvp.store');
        Route::get('/uevents', [EventController::class, 'userIndex'])->name('uevents');
        Route::post('/rsvp/{rsvpID}/cancel', [RsvpController::class, 'cancel'])->name('rsvp.cancel');


        Route::inertia('udashboard', 'UDashboard')->name('udashboard');
    });
});

require __DIR__.'/settings.php';
