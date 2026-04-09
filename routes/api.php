<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\SeatAssignmentController;

// Seat API routes (protected)
// auth sanctum cek Is user logged in? and Is request authenticated?
// maksudnya only logged-in users can create seats, delete seats, or assign seats
Route::middleware(['web', 'auth'])->group(function() {
    Route::post('/seats', [SeatController::class, 'store'])->name('seats.store');
    Route::delete('/seats/{seat}', [SeatController::class, 'destroy'])->name('seats.destroy');
    Route::post('/assign-seat', [SeatAssignmentController::class, 'store'])->name('seat-assignments.store');
});