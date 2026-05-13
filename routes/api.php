<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\SeatAssignmentController;

Route::middleware(['web', 'auth'])->group(function () {
    // Admin + superadmin seat management
    Route::post('/seats', [SeatController::class, 'store']);
    Route::delete('/seats/{seat}', [SeatController::class, 'destroy']);
    Route::delete('/events/{event}/seats', [SeatController::class, 'destroyAll']);

    // User seat selection
    Route::post('/seats/{seat}/select', [SeatController::class, 'selectSeat']);
    Route::post('/seats/{seat}/release', [SeatController::class, 'releaseSeat']);
    Route::post('/confirm-seat', [SeatAssignmentController::class, 'store']);

    // Polling
    Route::get('/events/{event}/seat-status', [SeatController::class, 'statusPoll']);
});
