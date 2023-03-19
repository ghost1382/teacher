<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class CourseUserController extends Controller
{
    public function store(Request $request, Course $course)
{
    $request->validate([
        'class_id' => ['required', 'exists:courses,class_id'],
    ]);

    $class_id = $request->get('class_id');
    $users = User::where('class_id', $class_id)->get();

    foreach ($users as $user) {
        $course->addUser($user->email);
    }

    return Redirect::route('admin.course.edit', $course);
}


    public function destroy(Request $request, Course $course, User $user)
    {
        $course->removeUser($user);

        return back();
    }
}
