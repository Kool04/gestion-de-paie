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
        Schema::create('action', function (Blueprint $table) {
            $table->bigIncrements('ref');
            $table->integer('num_emp')->nullable(false);
            $table->string('action', 30)->nullable(false);
            $table->text('motif')->nullable(false);
            $table->string('montant', 20)->nullable(false);
            $table->timestamp('date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('action');
    }
};
