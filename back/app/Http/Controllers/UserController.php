<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Response;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;

    }

    public function login()
    {
        $credentials = $this->request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) return $validator->errors();

        if (Auth::attempt($credentials)) {
            $adminStatus = User::where('role', 'ROLE_ADMIN')->exists();
            $this->request->session()->regenerate();
            return ['success' => 'User successfully logged in.', 'admin' => $adminStatus];


        }


        return ['error' => 'Login failed.'];

    }

    public
    function register()
    {
        $credentials = $this->request->only('name', 'email', 'password', 'confirm_password', 'role');

        $validator = Validator::make($credentials, [
            'name' => 'required|min:5|max:100|regex:/^[a-z +]*$/i',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|max:100',
            'confirm_password' => 'required|same:password',
            'role' => 'required|in:ROLE_USER,ROLE_ADMIN'
        ], [
            'name.required' => 'The name field is required',
            'name.regex' => 'Only letters allowed for the name'
        ]);

        if ($validator->fails()) return $validator->errors();


        $user = new User();
        $user->name = $this->request->get('name');
        $user->email = $this->request->get('email');
        $user->password = Hash::make($this->request->get('password'));
        $user->role = $this->request->get('role');
        try {
            $user->save();

        } catch (QueryException $e) {
            if ($e->getCode() === 2002) {
                $message = 'Connection to database refused';
            } else {
                $message = 'Unknown error, please contact administrator';
            }
            return ['message' => $message];
        }
        return ['success' => true];


    }

    public function isAlive()
    {
        return Auth::check() ? Response()->noContent() : Response('', 401);
    }

    public function logout()
    {
        Auth::logout();
//        $this->request->session()->invalidate();
    }

}
