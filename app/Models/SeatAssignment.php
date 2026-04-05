<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeatAssignment extends Model
{

    // Which user has this seat
    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'userID');
    }

    // Which seat is assigned
    public function seat()
    {
        return $this->belongsTo(Seat::class, 'seatID', 'seatID');
    }

    // Which event this assignment belongs to
    public function event()
    {
        return $this->belongsTo(Event::class, 'eventID', 'eventID');
    }

}
