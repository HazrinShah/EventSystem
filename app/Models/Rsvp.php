<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rsvp extends Model
{
    
    protected $primaryKey = 'rsvpID';
    protected $fillable = ['userID', 'eventID', 'status', 'pax', 'note', 'cancelled_at'];

    public function scopeActive($query){
        return $query->whereNull('cancelled_at');
    }

    public function scopeCancelled($query){
        return $query->whereNotNull('cancelled_at');
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'userID');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'eventID', 'eventID');
    }

    public function seatAssignments()
    {
        return $this->hasMany(SeatAssignment::class, 'rsvpID', 'rsvpID');
    }
}
