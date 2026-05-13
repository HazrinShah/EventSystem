<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'phone', 'role', 'email', 'password', 'is_active'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    protected $primaryKey = 'userID';

    // Admin create events
    public function createdEvents()
    {
        return $this->hasMany(Event::class, 'created_by', 'userID');
    }

    // user hadir banyak event
    public function rsvps()
    {
        return $this->hasMany(Rsvp::class, 'userID', 'userID');
    }

    // Many-to-Many shortcut antara users dan events melalui table rsvps
    // Boleh terus panggil: $user->eventsAttending → semua event dia RSVP
    public function eventsAttending()
    {
        return $this->belongsToMany(Event::class, 'rsvps', 'userID', 'eventID');
    }

    // user bole ade bnyk seat
    public function seatAssignments()
    {
        return $this->hasMany(SeatAssignment::class, 'userID', 'userID');
    }
}
