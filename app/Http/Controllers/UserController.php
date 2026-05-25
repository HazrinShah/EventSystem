<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function adminList(){
        $admins = User::whereIn('role', ['admin'])->get();
        return Inertia::render('SuperAdmin/User/SAUserManagement', ['admins' => $admins]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'phone'    => 'nullable|string|max:20',
            'role'     => 'required|in:superadmin,admin,user',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return back()->with('success', 'User created.');
    }

    public function update(Request $request, User $user){
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $user->userID . ',userID',
            'phone'    => 'nullable|string|max:20',
            'role'     => 'required|in:superadmin,admin,user',
            'password' => 'nullable|string|min:8',
        ]);

        if ($validated['password']) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return back()->with('success', 'User updated.');
    }

    public function deactivate(User $user){
        $user->update(['is_active' => false]);
        return back()->with('success', 'Admin deactivated.');
    }

    public function reactivate(User $user){
        $user->update(['is_active' => true]);
        return back()->with('success', 'Admin reactivated.');
    }
}
