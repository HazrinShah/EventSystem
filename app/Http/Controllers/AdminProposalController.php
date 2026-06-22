<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventProposal;
use App\Models\Event;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class AdminProposalController extends Controller
{
    public function index()
    {
        $proposals = EventProposal::with('user')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Proposal/AProposalIndex', [
            'proposals' => $proposals
        ]);
    }

    public function approve(Request $request, $proposalID)
    {
        $request->validate([
            'valid_from' => 'required|date',
            'valid_until' => 'required|date|after_or_equal:valid_from',
        ]);

        $proposal = EventProposal::findOrFail($proposalID);

        // Auto create event
        $event = Event::create([
            'title' => $proposal->title,
            'description' => $proposal->description,
            'date' => $proposal->date,
            'time' => $proposal->time,
            'location' => $proposal->location,
            'seat_limit' => $proposal->seat_limit ?? 0,
            'image' => $proposal->image,
            'layoutImage' => $proposal->layoutImage,
            'created_by' => $proposal->userID,
        ]);

        $proposal->update([
            'status' => 'approved',
            'valid_from' => Carbon::parse($request->valid_from)->startOfDay(),
            'valid_until' => Carbon::parse($request->valid_until)->endOfDay(),
            'eventID' => $event->eventID,
        ]);

        return back()->with('success', 'Proposal approved and event created successfully.');
    }

    public function reject(Request $request, $proposalID)
    {
        $request->validate([
            'admin_remarks' => 'required|string|max:1000',
        ]);

        $proposal = EventProposal::findOrFail($proposalID);

        $proposal->update([
            'status' => 'rejected',
            'admin_remarks' => $request->admin_remarks,
        ]);

        return back()->with('success', 'Proposal rejected.');
    }
}
