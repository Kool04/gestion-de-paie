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

        Schema::create('payment', function (Blueprint $table) {
            $table->bigIncrements('num_payment');
            $table->integer('num_emp')->nullable(false);
            $table->string('type', 30)->nullable(false);
            $table->string('montant')->nullable(false);
            $table->timestamp('date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment');
    }
};
