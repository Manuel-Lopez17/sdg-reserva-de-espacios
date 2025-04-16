<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    /**
     * Relación de reserva a usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación de reserva a espacio.
     */
    public function space()
    {
        return $this->belongsTo(Space::class);
    }

    /**
     * Los atributos que son asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'space_id',
        'start_time',
        'end_time',
        'status',
    ];

}
