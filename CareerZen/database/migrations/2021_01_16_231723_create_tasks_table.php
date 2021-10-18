<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task', function (Blueprint $table) {
            $table->id();
            // $table->increments('id');
            $table->string('title');
            $table->text('description');
            $table->string('status');
            $table->string('date');
            $table->string('time');
  
            $table->unsignedBigInteger('user_id');
            
            // Foreign key future
            // $table->foreignId('user_id')
            //       ->constrained();
            // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
           
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
