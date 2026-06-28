<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function adminList(Request $request){

        $query = User::query();

        if ($request->filled('search')) {
            $searchTerm = '%' . $request->search . '%';

            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', $searchTerm)
                ->orWhere('email', 'like', $searchTerm);
            });

        }

        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        $allowedSort = ['name', 'email', 'phone', 'role', 'is_active'];
        if(in_array($sortField, $allowedSort)){
            $query->orderBy($sortField, $sortDirection);  
        }else{
            $query->orderBy('created_at', 'desc');
        }


        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status === 'active' ? 1 : 0);
        }

        if ($request->filled('role') && $request->role !== 'all') {
            $query->where('role', $request->role);
        }

        $perPage = $request->input('per_page', 10);
        
        $admins = $query->paginate($perPage)->withQueryString();

        return Inertia::render('SuperAdmin/User/SAUserManagement', [
            'admins' => $admins,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'role' => $request->role,
                'per_page' => $request->per_page,
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
            ]
        ]);
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
        return back()->with('success', 'User deactivated.');
    }

    public function reactivate(User $user){
        $user->update(['is_active' => true]);
        return back()->with('success', 'User reactivated.');
    }
}
