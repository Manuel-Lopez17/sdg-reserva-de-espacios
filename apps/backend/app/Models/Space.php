<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    use HasFactory;

    /**
     * Relación de espacio a reservas.
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Los atributos que son asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'capacity',
        'price_per_hour',
        'available',
    ];
}
