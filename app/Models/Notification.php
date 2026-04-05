<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    public function event()
    {
        return $this->belongsTo(Event::class, 'eventID', 'eventID');
    }
}
