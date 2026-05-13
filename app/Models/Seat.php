<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    protected $primaryKey = 'seatID';


    // ni kalau takde, Seat::create() command ni tak func
    protected $fillable = [
        'eventID',
        'label',
        'x_percent',
        'y_percent',
        'status',
        'selected_by',
        'selected_at',
    ];

    // turn selected at tu jadi dtetime. so nanti bole la add minute ke jam ke 
    // $model->selected_at->addMinutes(30);
    // $model->selected_at->addHours(2);
    protected $casts = [
        'selected_at' => 'datetime',
    ];

    const SELECTION_TIMEOUT_MINUTES = 10;



    public function event()
    {
        return $this->belongsTo(Event::class, 'eventID', 'eventID');
    }

    public function seatAssignments()
    {
        return $this->hasOne(SeatAssignment::class, 'seatID', 'seatID');
    }

    public function selectedBy()
    {
        return $this->belongsTo(User::class, 'selected_by', 'userID');
    }

    public function isBooked(): bool
    {
        return $this->status === 'booked';
    }

    // check if 'selected' status dah expired
    public function isSelectionExpired(): bool
    {
        if ($this->status !== 'selected' || !$this->selected_at) return false;
        return $this->selected_at->addMinutes(self::SELECTION_TIMEOUT_MINUTES)->isPast();
        // amik masa selected_at, tambah dgn expired tempoh, then check dia punya masa tu dah lepas ke belum. kalau dah lepas, maknanya expired, akan return true.
    }

    // Release expired seat - kalau dah expired kena lah jadi available balik
    public function releaseIfExpired(): bool
    {
        if($this->isSelectionExpired()){
            $this->update([
                'status' => 'available',
                'selected_at' => null,
                'selected_by' => null,
            ]);
            return true;
        }
        return false;
    }
}
