<?php

use App\Models\Course;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AddUserToCourseListener implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  UserCreated  $event
     * @return void
     */
    public function handle(UserCreated $event)
    {
        $user = $event->user;
        $class_id = $user->class_id;
        $courses = Course::where('class_id', $class_id)->get();
 
        foreach ($courses as $course) {
            $course->users()->attach($user->id, ['class_id' => $class_id]);
        }
    }
}
