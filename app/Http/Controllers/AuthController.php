<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
   $data =    $request->validate([
    "full_name" => "required",
    "bio" => "required|max:100",
    "username" => "required|string|min:3|unique:users,username|regex:/^[a-zA-Z0-9._]+$/",
    "password" => "required|min:6",
    "is_private" => "nullable",
]);


User::create($data);


$user = User::where('username', $request->username)->first();
$token = $user->createToken('auth_token')->plainTextToken;



return response()->json([
    "message" => "Register success",
    "token" => $token,
    "user" => $user
]);




    }


    public function getDetailUser($username) {
        $user = User::where("username", $username)->first();

        if (!$user) {
            return response()->json([
                "message" => "User not found"
            ], 404);
        }


        return response()->json($user->load('posts')->load('posts.attachments')->loadCount('posts')->loadCount('follower')->loadCount('following'));

    }



    public function getAllUser() {
        $users = User::all();
        return response()->json($users);
    }



    public function login(Request $request) {
        $request->validate([
            "username" => "required",
            "password" => "required",
        ]);


        $user = User::where('username', $request->username)->first();
        if ($user  && Hash::check($request->password, $user->password)) {
            $token = $user->createToken("auth_token")->plainTextToken;
            return response()->json([
    "message" => "Login success",
    "token" => $token,
    "user" => $user
]);
        }
        else {
          return response()->json([ "message" => "Wrong username or password"], 401);

        }
    }


    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            "message" => "Logout success"
        ]);
    }
}
