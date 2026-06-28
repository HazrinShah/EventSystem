<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;
    
    protected $primaryKey = 'eventID';
    public $timestamps = true;
    protected $fillable = ['title', 'description', 'start_date', 'end_date', 'start_time', 'end_time', 'location', 'image', 'layoutImage', 'created_by', 'seat_limit'];

    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
    ];

    protected $appends = ['status'];

    public function getStatusAttribute(): string
    {
        $today = now()->toDateString();
        if ($this->end_date && $this->end_date < $today) {
            return 'closed';
        }
        return 'open';
    }


    // Creator
    public function creator()
    {
                                            // fk - nama kat table event 
        return $this->belongsTo(User::class, 'created_by', 'userID');
                                                            // localkey - nama kat table utama (user)
    }

    // RSVPs
    public function rsvps()
    {
        return $this->hasMany(Rsvp::class, 'eventID', 'eventID');
    }

    // Many-to-Many shortcut antara events dan users melalui table rsvps
    // $event->attendees → semua user RSVP event tu
        public function attendees()
    {
        return $this->belongsToMany(User::class, 'rsvps', 'eventID', 'userID');
    }

    // event ade banyak seat
    public function seats()
    {
        return $this->hasMany(Seat::class, 'eventID', 'eventID');
    }

    // Boleh check mana seat yang dah assign ke user
    public function seatAssignments()
    {
        return $this->hasMany(SeatAssignment::class, 'eventID', 'eventID');
    }

    // Notifications
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'eventID', 'eventID');
    }

    public function assignedAdmins()
    {
        return $this->belongsToMany(User::class, 'event_admins', 'eventID', 'userID');
    }


}
