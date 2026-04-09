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
        Schema::table('seats', function (Blueprint $table) {
            $table->string('label')->nullable()->after('seatID');
            $table->float('x_percent', 10, 6)->after('label');
            $table->float('y_percent', 10, 6)->after('x_percent');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('seats', function (Blueprint $table) {
            $table->dropColumn('label', 'x_percent', 'y_percent');
            $table->dropColumn('seat_number', 'table_number', 'status');
        });

    }
};
