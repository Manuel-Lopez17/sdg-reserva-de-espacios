<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Space;

class SpaceSeeder extends Seeder
{
    public function run()
    {
        Space::create([
            'name' => 'Sala de Reuniones 1',
            'description' => 'Espacio adecuado para reuniones de hasta 10 personas.',
            'capacity' => 10,
        ]);

        Space::create([
            'name' => 'Área de Coworking 1',
            'description' => 'Espacio compartido para trabajo en equipo y freelancers.',
            'capacity' => 20,
        ]);

        Space::create([
            'name' => 'Sala de Conferencias',
            'description' => 'Gran espacio para conferencias y presentaciones.',
            'capacity' => 50,
        ]);
    }
}
