<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(){
        $events = Event::all();
        return Inertia::render('AEvent', [
            'events' => $events,
        ]);
    }

    public function userIndex(Request $request){
        $userID = $request->user()->userID;

        $events = Event::with(['rsvps' => function($q) use ($userID) {
            $q->where('userID', $userID);
        }])->get();

        return Inertia::render('UEvent', [
            'events' => $events,
        ]);
    }
    public function add(){
        return Inertia::render('ACreateEvent');
    }

    public function store(Request $request){
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string',
            'image' => 'image|max:2048',
            'time' => 'required',
            'layoutImage' => 'image|max:2048',
        ]); 

        // TAPI kena run ni untuk linkkan
        // php artisan storage:link
        // check ade tak file name picture send
        if ($request->hasFile('image')) {
            // kalau ade simpan kat folder 'pictures' and dapatkan dia punya jalan tu
            $filePath = $request->file('image')->store('pictures', 'public');
            // masukkan filepath tadi kat dalam validated sebelum save kt db 
            $validated['image'] = $filePath;

            // <form method="POST" enctype="multipart/form-data">
            // form kene mcmtu enctype tu
            // <img src="{{ asset('storage/' . $row->picture) }}">
            // ni untuk display
            // kat vue ni
        }

        if ($request->hasFile('layoutImage')) {
            $layoutFilePath = $request->file('layoutImage')->store('layoutImages', 'public');
            $validated['layoutImage'] = $layoutFilePath;
        }

        Event::create([
            ...$validated,
            'created_by' => $request->user()->userID,
        ]);
        return redirect('/events');

    }

    public function update(Request $request, $id){
        $event = Event::FindorFail($id);

        $validated = $request -> validate (

            [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'date' => 'required|date',
                'location' => 'required|string',
                'image' => 'nullable|image|max:2048',
                'time' => 'required',
                'layoutImage' => 'nullable|image|max:2048',
            ]
        );
        
          // check ade tak file name picture send
        if ($request->hasFile('image')) {
            // kalau ade simpan kat folder 'pictures' and dapatkan dia punya path tu
            $filePath = $request->file('image')->store('pictures', 'public');
            // masukkan filepath tadi kat dalam validated sebelum save kt db 
            $validated['image'] = $filePath;
        }
        else {
            // kalau tak pakai unset ni, picture akan set as null kalau user tak upload gambar baru
            // so gambar lama akan hilang
            // so kita pakai unset untuk ignore picture
            // kalau takde gambar baru, picture takkan update
            unset($validated['image']);
        }

        if ($request->hasFile('layoutImage')) {
            $layoutFilePath = $request->file('layoutImage')->store('layoutImages', 'public');
            $validated['layoutImage'] = $layoutFilePath;
        }
        else {
            unset($validated['layoutImage']);
        }

        // update data kat dalam db
        $event->update($validated);
        
        return redirect('/events')->with('success', 'event updated successfully.');

    }

    public function delete(Event $event){
        $event->delete();
        return redirect('/events')->with('success', 'event deleted successfully.');

    }
}
