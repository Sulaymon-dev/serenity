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
    Schema::create('team_invitations', function (Blueprint $table) {
      $table->unsignedBigInteger('id')->primary();
      $table->foreignId('team_id')->constrained()->cascadeOnDelete();
      $table->string('email');
      $table->string('role')->nullable();
      $table->timestamp('created_at')->useCurrent();
      $table->timestamp('updated_at')->useCurrent();

      $table->unique(['team_id', 'email']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('team_invitations');
  }
};
