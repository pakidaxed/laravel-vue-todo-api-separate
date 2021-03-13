<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('guest')->post('login', [UserController::class, 'login']);
Route::middleware('guest')->post('registration', [UserController::class, 'register']);
Route::get('logout', [UserController::class, 'logout']);
Route::get('alive', [UserController::class, 'isAlive']);

Route::middleware('auth')->get('tasks', [TaskController::class, 'show']);
Route::middleware('auth')->get('admin/dashboard', [TaskController::class, 'show']);
Route::middleware('auth')->get('admin/users', [TaskController::class, 'users']);

