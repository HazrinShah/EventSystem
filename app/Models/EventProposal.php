<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; //untuk buat dummy data ? macam user dummy
use Illuminate\Database\Eloquent\Model;

class EventProposal extends Model
{
    use HasFactory;

    protected $primaryKey = 'proposalID';

    protected $fillable = ['userID', 'title', 'description', 'start_date', 'end_date', 'start_time', 'end_time',
    'location', 'seat_limit', 'image', 'layoutImage', 'approval_document', 
    'status', 'admin_remarks', 'valid_from', 'valid_until', 'eventID'];

    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
        'valid_from' => 'datetime:Y-m-d H:i:s',
        'valid_until' => 'datetime:Y-m-d H:i:s',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'userID','userID');
    }

    public function event(){
        return $this->belongsTo(Event::class, 'eventID','eventID');
    }

    
}
