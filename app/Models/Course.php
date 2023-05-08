<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mews\Purifier\Facades\Purifier;

class Course extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function booted()
    {
        static::creating(function($course) {
            $course->file_name = Purifier::clean($course->file_name);
        });

        static::updating(function($course) {
            $course->file_name = Purifier::clean($course->file_name);
        });
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('class_id');
    }
    
    public function addUser(User $user, $class_id)
    {
        if (!$this->users->contains($user)) { // Check if the user is already enrolled
            $this->users()->attach($user->id, ['class_id' => $class_id]);
        }
    }
    

    public function removeUser($user)
    {
        $this->users()->detach($user->id);
    }
}
