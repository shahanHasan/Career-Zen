<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $table = 'task';

    protected $fillable =['title', 'description', 'status', 'user_id', 'date', 'time'];

    public function user(){
        return $this->belongsTo(User::class, "user_id");
    }

    
}
