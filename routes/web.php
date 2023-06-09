<?php

use GuzzleHttp\Psr7\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (!auth()->check()) {
        return Redirect::route('login');
    }

    $user = Auth::user();

    if ($user->isAdmin()) {
        return Redirect::route('admin.course.index');
    }

    return Redirect::route('my-courses');
});


Route::middleware(['auth'])->group(function() {
    Route::resource('course', App\Http\Controllers\Front\CourseController::class)->only(['show']);
    Route::resource('course.module', App\Http\Controllers\Front\ModuleController::class)->only(['show']);
    Route::resource('course.module.lesson', App\Http\Controllers\Front\LessonController::class)->only(['show']);
    Route::get('/my-courses', [App\Http\Controllers\Front\MyCoursesController::class, 'show'])->name('my-courses');
    Route::post('/lesson/{lesson}/user/{user}', [App\Http\Controllers\Front\LessonUserController::class, 'store'])->name('lesson.user.store');
    Route::match(['PUT', 'POST'], '/admin/courses', [App\Http\Controllers\Admin\CourseController::class, 'store'])->name('admin.courses.store');
    Route::put('/admin/courses', [App\Http\Controllers\Admin\CourseController::class, 'store'])->name('admin.courses.store');
    Route::post('/admin/course/{course}/user', [App\Http\Controllers\Admin\CourseUserController::class, 'store'])->name('admin.course.user.store');
    Route::get('/admin/course/{course}/users', [App\Http\Controllers\Admin\CourseUserController::class, 'index'])
    ->name('courses.users.index');
    Route::put('/admin/courses/{course}', [App\Http\Controllers\Admin\CourseController::class, 'update'])->name('admin.courses.update');
    Route::get('/admin/courses/{course}/edit', [App\Http\Controllers\Admin\CourseController::class, 'edit'])->name('admin.courses.edit');

    
});

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', 'isAdmin'])->group(function () {
    Route::resource('course', App\Http\Controllers\Admin\CourseController::class)->only(['index', 'edit', 'create', 'store', 'update', 'destroy']);
    Route::resource('course.module', App\Http\Controllers\Admin\ModuleController::class)->only(['index', 'edit', 'create', 'store', 'update', 'destroy']);
    Route::resource('course.module.lesson', App\Http\Controllers\Admin\LessonController::class)->only(['index', 'edit', 'create', 'store', 'update', 'destroy']);
    Route::resource('course.module.lesson.question', App\Http\Controllers\Admin\QuestionController::class)->only(['create']);

    Route::resource('user', App\Http\Controllers\Admin\UserController::class)->only(['index', 'create', 'store', 'show']);
    Route::get('course/{course}', [App\Http\Controllers\Admin\CourseController::class, 'show'])->name('admin.course.index');
    Route::resource('course.user', App\Http\Controllers\Admin\CourseUserController::class)->only(['destroy']);
});



require __DIR__.'/auth.php';

