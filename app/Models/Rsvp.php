<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rsvp extends Model
{
    
    protected $primaryKey = 'rsvpID';
    protected $fillable = ['userID', 'eventID', 'status', 'pax', 'note'];




    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'userID');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'eventID', 'eventID');
    }

    public function seatAssignment()
    {
        return $this->hasOne(SeatAssignment::class,);
    }
}
