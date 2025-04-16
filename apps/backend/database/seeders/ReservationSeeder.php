<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reservation;
use Carbon\Carbon;

class ReservationSeeder extends Seeder
{
    public function run()
    {
        Reservation::create([
            'user_id' => 2, // ID del usuario John Doe
            'space_id' => 1, // ID de la Sala de Reuniones 1
            'start_time' => Carbon::now()->addDays(1)->setTime(10, 0),
            'end_time' => Carbon::now()->addDays(1)->setTime(12, 0),
            'status' => 'pending',
        ]);

        Reservation::create([
            'user_id' => 3, // ID de la usuaria Jane Doe
            'space_id' => 2, // ID del Área de Coworking 1
            'start_time' => Carbon::now()->addDays(2)->setTime(9, 0),
            'end_time' => Carbon::now()->addDays(2)->setTime(11, 0),
            'status' => 'pending',
        ]);
    }
}
