<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class AddDeadlineToProjectsTable extends Migration
{
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            // Ajoutez la colonne "deadline" de type datetime
            $table->string('deadline')->nullable();
        });
    }

    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            // Retirez la colonne si la migration est annulée
            $table->dropColumn('deadline');
        });
    }
}
