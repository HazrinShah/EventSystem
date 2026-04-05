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
        Schema::create('rsvps', function (Blueprint $table) {
            $table->id('rsvpID'); // BIGINT PK
            $table->foreignId('userID')->constrained('users','userID')->onDelete('cascade');
            $table->foreignId('eventID')->constrained('events','eventID')->onDelete('cascade');
            $table->string('status');
            $table->integer('pax')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rsvps');
    }
};
