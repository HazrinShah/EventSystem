<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    protected $primaryKey = 'seatID';

    protected $fillable = [
        'eventID',
        'label',
        'x_percent',
        'y_percent',
    ];


    public function event()
    {
        return $this->belongsTo(Event::class, 'eventID', 'eventID');
    }

    public function seatAssignments()
    {
        return $this->hasOne(SeatAssignment::class, 'seatID', 'seatID');
    }

    public function isBooked(): bool
    {
        return $this->seatAssignments()->exists();
    }
}
