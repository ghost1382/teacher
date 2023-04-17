<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Course/Index', [
            'courses' => Course::all(),
        ]);
    }

    public function edit(Course $course)
{
    return Inertia::render('Admin/Course/Edit', [
        'course' => $course,
        'modules' => $course->modules,
        'users' => $course->users
    ]);
}

public function update(UpdateCourseRequest $request, Course $course)
{
    $data = $request->validated();
    
    if ($request->hasFile('file')) {
        Storage::disk('public')->delete($course->file_path);
        $file = $request->file('file');
        $file_name = time() . '_' . $file->getClientOriginalName();
        $file_path = $file->storeAs('public/files', $file_name);
        $data['file_path'] = str_replace('public/', '', $file_path);
        $data['file_name'] = $file_name;
    }

    $course->update($data);

    return redirect()->route('admin.course.index')->with('success', 'Course updated successfully');
}




    public function create()
    {
        return Inertia::render('Admin/Course/Create', [
            'error' => session('error')
        ]);
    }
    
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'regex:/^[^0-9]/'],
            'file' => 'required|file|max:2048',
        ]);
    
        $file = $request->file('file');
        $file_name = time() . '_' . $file->getClientOriginalName();
        $file_path = $file->storeAs('public/files', $file_name);
    
        // Check if a course with the same title already exists
        $existingCourse = Course::where('title', $validatedData['title'])->first();
    
        if ($existingCourse) {
            return redirect()->back()->withErrors(['title' => 'A course with the same title already exists'])->withInput();
        }
    
        $course = Course::create([
            'title' => $validatedData['title'],
            'file_name' => $file_name,
            'file_path' => str_replace('public/', '', $file_path),
        ]);
    
        $fileUrl = Storage::url($file_path);
    
        return redirect()->route('admin.course.index')->with('success', 'File uploaded successfully');
    }
    
    
    

    public function downloadFile($id)
{
    $course = Course::findOrFail($id);
    $file_path = Storage::disk('public')->path($course->file_path);
    return response()->download($file_path, $course->file_name);
}
    
    
    



   

    public function destroy(Request $request, Course $course)
    {
        $course->delete();

        return Redirect::route('admin.course.index');
    }
    public function upload(Request $request, $id)
    {
        $course = Course::findOrFail($id);
    
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('files/courses'), $filename);
            $course->file_path = 'files/courses/' . $filename;
            $course->save();
        }
    
        return response()->json([
            'message' => 'File uploaded successfully',
            'file_path' => $course->file_path
        ]);
    }
    

    
    public function show(Course $course)
    {
        return Inertia::render('Admin/Course/Show', [
            'course' => $course,
            'modules' => $course->modules,
            'users' => $course->users
        ]);
    }
    

}
