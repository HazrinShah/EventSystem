<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeatAssignment extends Model
{

    protected $primaryKey = 'assignmentID';

    protected $fillable = [
        'seatID',
        'rsvpID',
    ];


    // Which seat is assigned
    public function seat()
    {
        return $this->belongsTo(Seat::class, 'seatID', 'seatID');
    }

    // Which RSVP this assignment belongs to
    public function rsvp()
    {
        return $this->belongsTo(RSVP::class, 'rsvpID', 'rsvpID');
    }

}
