<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\Module;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       

    
        $this->call(UserRoleSeeder::class);
        $this->call(AdminSeeder::class);
        $this->call(ClassesTableSeeder::class);
    }
}
