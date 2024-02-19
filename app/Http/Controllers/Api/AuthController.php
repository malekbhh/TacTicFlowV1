<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Contracts\User as SocialiteUser;
class AuthController extends Controller
{
   
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }


  
    public function handleGoogleCallback(Request $request)
    {
        try {
            $user = $request->input('user');

            // Check if the user already exists in the Laravel database
            $existingUser = User::where('email', $user['email'])->first();

            if (!$existingUser) {
                // User doesn't exist, create a new user in the Laravel database
                $newUser = $this->createUserFromGoogle($user);
                Auth::login($newUser);
            } else {
                // User already exists, log in
                Auth::login($existingUser);
            }

            // Get the authenticated user and generate a token
            $authenticatedUser = Auth::user();
            $token = $authenticatedUser->createToken('main')->plainTextToken;

            return response()->json(['token' => $token]);
        } catch (\Exception $e) {
            // Handle the exception
            return response()->json(['error' => 'Google login failed. Please try again.'], 500);
        }
    }

    private function createUserFromGoogle(array $userData)
    {
        return User::create([
            'name' => $userData['displayName'],
            'email' => $userData['email'],
            'password' => bcrypt(Str::random(16)),
        ]);
    }
}
    
 