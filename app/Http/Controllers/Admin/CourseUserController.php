<?php
namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Course;
use App\Models\Classe;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;


class CourseUserController extends Controller
{
    public function store(Request $request, Course $course)
    {
        $request->validate([
            'class' => ['required', 'exists:classes,name'],
        ]);
    
        $class = $request->get('class');
        $users = User::where('class_id', $class)->get();
    
        foreach ($users as $user) {
            $course->addUser($user->id);
        }
    
        return Redirect::route('admin.course.edit', $course);
    }
    


    public function destroy(Request $request, Course $course, User $user)
    {
        $course->removeUser($user);

        return back();
    }
}
