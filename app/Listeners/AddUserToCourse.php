<?php

namespace App\Listeners;

use App\Models\User;
use App\Models\Course;
use Illuminate\Auth\Events\Registered;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class AddUserToCourse
{
    public function handle(Registered $event)
    {
        $user = $event->user;
        $class_id = $user->class_id;

        // Find all courses that have the same class as the user
        $courses = Course::whereHas('users', function ($query) use ($class_id) {
            $query->where('users.class_id', $class_id);
        })->get();

        // Add the user to each of the courses
        foreach ($courses as $course) {
            $existing_users = $course->users()->where('course_user.class_id', $class_id)->pluck('users.id')->toArray();
            if (!in_array($user->id, $existing_users)) {
                $course->addUser($user, $class_id);
            }
        }
    }
}

