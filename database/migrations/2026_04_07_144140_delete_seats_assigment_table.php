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
            $table->dropForeign('seat_assignments_userid_foreign');
            $table->dropForeign('seat_assignments_eventid_foreign');
            $table->dropColumn(['userID', 'eventID']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('seat_assignments', function (Blueprint $table) {
            $table->unsignedBigInteger('userID')->nullable();
            $table->unsignedBigInteger('eventID')->nullable();
        });
    }
};
