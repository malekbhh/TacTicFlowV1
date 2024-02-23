<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ProjectController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

       // Routes pour la gestion des projets
       Route::get('/projects', [ProjectController::class, 'index']);
       Route::post('/projects', [ProjectController::class, 'store']);
       Route::get('/projects/{id}', [ProjectController::class, 'show']);
       Route::put('/projects/{id}', [ProjectController::class, 'update']);
       Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
   });


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Remove one of the following lines, as they are duplicate
Route::post('/loginwithgoogle', [AuthController::class, 'handleGoogleCallback']);

Route::post('/passwordreset', [AuthController::class, 'passwordReset']);
Route::post('/newpassword', [AuthController::class, 'newPassword']);
