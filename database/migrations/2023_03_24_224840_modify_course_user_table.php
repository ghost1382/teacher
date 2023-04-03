<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class aaa extends Migration
{
    public function up()
    {
        Schema::table('course_user', function (Blueprint $table) {
            // Drop the existing primary key
            $table->dropPrimary();

            // Add the new composite primary key
            $table->primary(['course_id', 'class_id']);

            // Remove the foreign key constraint on user_id
            $table->dropForeign(['user_id']);

            // Remove the user_id column
            $table->dropColumn('user_id');
        });
    }

    public function down()
    {
        Schema::table('course_user', function (Blueprint $table) {
            // Add back the user_id column
            $table->unsignedBigInteger('user_id');

            // Add back the foreign key constraint on user_id
            $table->foreign('user_id')->references('id')->on('users');

            // Drop the composite primary key
            $table->dropPrimary();

            // Add back the original primary key on id column
            $table->primary('id');
        });
    }
}


