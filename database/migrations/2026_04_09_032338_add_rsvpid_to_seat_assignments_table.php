<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('seat_assignments', function (Blueprint $table) {
            $table->foreignId('rsvpID')->constrained('rsvps', 'rsvpID')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('seat_assignments', function (Blueprint $table) {
            $table->dropForeign(['rsvpID']);
            $table->dropColumn('rsvpID');
        });
    }

};
