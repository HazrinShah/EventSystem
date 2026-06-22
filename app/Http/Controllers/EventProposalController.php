<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventProposal;
use Inertia\Inertia;

class EventProposalController extends Controller
{
    public function index()
    {
        $proposals = EventProposal::where('userID',auth()->id())->latest()->get();
        return Inertia::render('User/Proposal/UProposalIndex',[
            'proposals' => $proposals
        ]);
    }

    public function create(){
        return Inertia::render('User/Proposal/UProposalCreate');
    }

    public function store(Request $request){
            $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
            'location' => 'required|string',
            'seat_limit' => 'nullable|integer',
            'approval_document' => 'required|mimes:pdf,jpg,jpeg,png|max:5120',
            'image' => 'nullable|image|max:2048',
            'layoutImage' => 'nullable|image|max:2048',
        ]);

        $docPath = $request->file('approval_document')->store('proposals', 'public');
        $imagePath = $request->hasFile('image') ? $request->file('image')->store('events', 'public') : null;
        $layoutPath = $request->hasFile('layoutImage') ? $request->file('layoutImage')->store('events', 'public') : null;

        EventProposal::create([
                    
            'userID' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'time' => $request->time,
            'location' => $request->location,
            'seat_limit' => $request->seat_limit,
            'image' => $imagePath,
            'layoutImage' => $layoutPath,
            'approval_document' => $docPath,
            'status' => 'pending'

        ]);

        return redirect()->route('user.proposals.index')->with('success','Proposal submitted successfully');
    }
}
