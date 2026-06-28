<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'SuperAdmin',
                'password' => bcrypt('password'),
                'role' => 'superadmin',
                'is_active' => true,
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin 1',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'is_active' => true,
            ]
        );
    }
}
