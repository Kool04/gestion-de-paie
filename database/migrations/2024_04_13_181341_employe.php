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
        Schema::create('employe', function (Blueprint $table) {
            $table->integer('num_emp')->primary();
            $table->string('nom', 30)->nullable();
            $table->string('prenom', 20)->nullable();
            $table->string('cin', 20)->nullable();
            $table->string('poste', 50)->nullable();
            $table->string('lieu', 50)->nullable();
            $table->string('num_carte', 20)->nullable();
            $table->string('num_tel', 20)->nullable();
            $table->string('adresse', 50)->nullable();
            $table->string('email', 50)->nullable();
            $table->string('salaire_base', 20)->nullable();
            $table->string('salaire_fin', 20)->nullable();
            $table->string('photo_path')->nullable();  // Chemin de l'image

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employe');
    }
};
