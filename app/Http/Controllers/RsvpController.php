<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Rsvp;
use Illuminate\Http\Request;

// ade store utk user submit rsvp. index untuk admin tgok rsvp 

class RsvpController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'eventID' => 'required|exists:events,eventID',
            'pax' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ]);

        // check duplicate — user dah RSVP event ni ke belum
        // check current use logged in n amik userid dia
        $exists = Rsvp::where('userID', $request->user()->userID)
                    // check ade tak userid tu kat dalam event id ni
                    ->where('eventID', $validated['eventID'])
                    // kalau exist true, kalau takde false
                    ->exists();

        if ($exists) {
            return back()->withErrors(['rsvp' => 'You have already RSVP\'d for this event.']);
        }

        Rsvp::create([
            // 3 dot tu dia gabungkan validated punya isi dgn 2 baru kat bawah ni
            ...$validated,
            'userID' => $request->user()->userID,
            'status' => 'pending',
        ]);

        return redirect()->route('seat.select', ['event' => $validated['eventID']]);
    }

    // public function index(Request $request)
    // {
    //     $user = $request->user();
    //     if($user->role === 'superadmin'){
    //         $rsvps = Rsvp::with(['user', 'event'])->get();
    //     } else if ($user->role === 'admin'){
    //     // admin bole tengok rsvp event dia created atau assigned to je
    //     $rsvps = Rsvp::with(['user', 'event'])
    //         ->whereHas('event', function ($q) use ($user) {
    //             $q->where('created_by', $user->userID)
    //             ->orWhereHas('assignedAdmins', fn($q2) => $q2->where('event_admins.userID', $user->userID));
    //         })
    //         ->get();
    //     }
    //     else {
    //         $rsvps = RSVP::with([])
    //     }

    //     return Inertia::render('ARsvp', ['rsvps' => $rsvps]);
    // }

    public function cancel($rsvpID)
    {
        Rsvp::where('rsvpID', $rsvpID)
            ->where('userID', auth()->user()->userID)
            ->firstOrFail()
            ->delete();

        return back();
    }


}
