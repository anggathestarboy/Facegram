<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('v1/auth/register', [AuthController::class, 'register']);   

Route::post('v1/auth/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function() {
    Route::post( 'v1/auth/logout', [AuthController::class, 'logout']);
    Route::post('v1/posts', [PostController::class, 'store']);
    Route::delete("v1/posts/{id}", [PostController::class, 'destroy']);

    Route::get('v1/posts', [PostController::class, 'index']);

    Route::post("v1/users/{username}/follow", [FollowController::class, 'store']);
    Route::delete('v1/users/{username}/unfollow', [FollowController::class, 'unFollow']);

    Route::get('v1/users/{username}/followers', [FollowController::class, 'getFollower']);
    Route::put('v1/users/{username}/accept', [FollowController::class, 'acceptUser']);
    Route::get('v1/users/{username}/following', [FollowController::class, 'getFollowing']);

    Route::get('/v1/users', [AuthController::class, 'getAllUser']);
    Route::get('/v1/users/{username}', [AuthController::class, 'getDetailUser']);
});