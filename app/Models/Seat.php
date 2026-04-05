<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    


    public function event()
    {
        return $this->belongsTo(Event::class, 'eventID', 'eventID');
    }

    public function seatAssignments()
    {
        return $this->hasOne(SeatAssignment::class, 'seatID', 'seatID');
    }
}
