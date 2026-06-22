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
        Schema::create('event_proposals', function (Blueprint $table) {
            $table->id('proposalID');
            
            // Merujuk kepada User yang memohon
            $table->foreignId('userID')->constrained('users', 'userID')->onDelete('cascade');
            
            // Maklumat Event
            $table->string('title');
            $table->text('description');
            $table->date('date');
            $table->time('time');
            $table->string('location');
            $table->integer('seat_limit')->nullable();
            
            // Gambar & Dokumen
            $table->string('image')->nullable(); // Gambar Poster
            $table->string('layoutImage')->nullable(); // Gambar Layout Tempat
            $table->string('approval_document'); // Surat kelulusan (Wajib)
            
            // Pengurusan Status & Tarikh Penganjur
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_remarks')->nullable();
            $table->dateTime('valid_from')->nullable();
            $table->dateTime('valid_until')->nullable();
            
            // Pautan ke Event rasmi jika diluluskan
            $table->foreignId('eventID')->nullable()->constrained('events', 'eventID')->nullOnDelete();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_proposals');
    }
};
