<?php

namespace Database\Seeders;

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            SpaceSeeder::class,
            ReservationSeeder::class,
        ]);
    }
}
