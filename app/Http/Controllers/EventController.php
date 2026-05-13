<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request){

        $user = $request->user();

        // superadmin bole tengok semua event
        if ($user->role === 'superadmin') {
            $events = Event::with('assignedAdmins')->get();
            $admins = \App\Models\User::whereIn('role', ['admin', 'superadmin'])->get(['userID', 'name', 'role']);
            return Inertia::render('SuperAdmin/Event/SAEvent', ['events' => $events,'admins' => $admins,]);
        }

        // admin bole nampak event yang dia create dan di assignkan sahaja
        $events = Event::where('created_by', $user->userID)
        ->orWhereHas('assignedAdmins', fn($q) => $q->where('event_admins.userID', $user->userID))
        ->get();

        return Inertia::render('Admin/Event/AEvent', ['events' => $events]);
    }

    public function superAdminIndex()
    {
        $events = Event::with('assignedAdmins')->withCount('rsvps')->get();
        return Inertia::render('SuperAdmin/Event/SAEvent', ['events' => $events]);
    }

    public function userIndex(Request $request){
        $userID = $request->user()->userID;

        $events = Event::with(['rsvps' => function($q) use ($userID) {
            $q->where('userID', $userID);
        }])->get();

        return Inertia::render('User/Event/UEvent', [
            'events' => $events,
        ]);
    }
    public function add(){
        return Inertia::render('Admin/Event/ACreateEvent');
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
            'seat_limit' => 'required|numeric|min:0',
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
          $user  = $request->user();

        // yang bole update ialah superadmin, admin yang created, atau admin yang diassignkan
        if ($user->role !== 'superadmin'
            && $event->created_by !== $user->userID
            && !$event->assignedAdmins()->where('userID', $user->userID)->exists()
        ) {
            abort(403);
        }

        $validated = $request -> validate (

            [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'date' => 'required|date',
                'location' => 'required|string',
                'image' => 'nullable|image|max:2048',
                'time' => 'required',
                'layoutImage' => 'nullable|image|max:2048',
                'seat_limit' => 'required|numeric|min:0',
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
          $user  = $request->user();

        // Only allow if superadmin, creator, or assigned admin
        if ($user->role !== 'superadmin'
            && $event->created_by !== $user->userID
            && !$event->assignedAdmins()->where('userID', $user->userID)->exists()
        ) {
            abort(403);
        }

        $event->delete();
        return redirect('/events')->with('success', 'event deleted successfully.');

    }

    public function assignAdmin(Request $request, Event $event){
        $validated = $request->validate([
            'userID' => 'required|exists:users,userID',
        ]);

        $user = \App\Models\User::findOrFail($validated['userID']);
        if(!in_array($user->role, ['admin','superadmin'])) {
            return back()->withErrors(['userID' => 'Selected user is not an admin']);
        }

        // assign admin kat event tapi check kalau dah mmg dia admin event tu takyah buat pape, kalau tak baru buat. 
        // admin sedia ade tu bairkan ke
        // syncWithoutDetaching

        $event->assignedAdmins()->syncWithoutDetaching([$validated['userID']]);
        return back()->with('success', 'Admin assigned to event.');
    }

    public function removeAdmin(Request $request, Event $event)
    {
        $validated = $request->validate([
            'userID' => 'required|exists:users,userID',
        ]);

        // detach untuk delete admin tu as admin  untuk event tu
        $event->assignedAdmins()->detach($validated['userID']);
        return back()->with('success', 'Admin removed from event.');
    }
}
