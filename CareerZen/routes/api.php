<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\AuthController;

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

Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('login' , [App\Http\Controllers\AuthController::class, 'login']);
Route::get('user', [App\Http\Controllers\AuthController::class, 'userDetail'])->middleware('auth:api');

// Route::post('todo', [App\Http\Controllers\TodoController::class, 'store']);
// Route::get('todoAll', [App\Http\Controllers\TodoController::class, 'index'])->middleware('auth:api');
Route::apiResource('todo', App\Http\Controllers\TodoController::class)->middleware('auth:api');
// ->middleware('auth:api');


