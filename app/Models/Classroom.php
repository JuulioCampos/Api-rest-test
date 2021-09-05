<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    use HasFactory;
    protected $fillable=['description'];
/**
 * mapeamento com os estudantes
 */

   public function students()
    {
        return $this->hasMany('App\Models\Student');
    }
}
