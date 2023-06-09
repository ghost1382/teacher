<?php


namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use Inertia\Inertia;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $classes = \App\Models\Classes::all();
        return Inertia::render('Auth/Register', [
            'classes' => $classes,
        ]);
    }
    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'class_id' => 'required|exists:classes,id'
        ]);

        $studentUserRole = UserRole::where('name', 'student')->first();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role_id' => $studentUserRole->id,
            'class_id' => $request->class_id
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('my-courses'));
    }
}

