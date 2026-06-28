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
        if (Schema::hasColumn('events', 'date')) {
            Schema::table('events', function (Blueprint $table) {
                $table->renameColumn('date', 'start_date');
                $table->renameColumn('time', 'start_time');
            });
        }
        
        Schema::table('events', function (Blueprint $table) {
            if (!Schema::hasColumn('events', 'end_date')) {
                $table->date('end_date')->after('start_date')->nullable();
                $table->time('end_time')->after('start_time')->nullable();
            }
        });

        if (Schema::hasColumn('event_proposals', 'date')) {
            Schema::table('event_proposals', function (Blueprint $table) {
                $table->renameColumn('date', 'start_date');
                $table->renameColumn('time', 'start_time');
            });
        }
        
        Schema::table('event_proposals', function (Blueprint $table) {
            if (!Schema::hasColumn('event_proposals', 'end_date')) {
                $table->date('end_date')->after('start_date')->nullable();
                $table->time('end_time')->after('start_time')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['end_date', 'end_time']);
        });
        if (Schema::hasColumn('events', 'start_date')) {
            Schema::table('events', function (Blueprint $table) {
                $table->renameColumn('start_date', 'date');
                $table->renameColumn('start_time', 'time');
            });
        }

        Schema::table('event_proposals', function (Blueprint $table) {
            $table->dropColumn(['end_date', 'end_time']);
        });
        if (Schema::hasColumn('event_proposals', 'start_date')) {
            Schema::table('event_proposals', function (Blueprint $table) {
                $table->renameColumn('start_date', 'date');
                $table->renameColumn('start_time', 'time');
            });
        }
    }
};
