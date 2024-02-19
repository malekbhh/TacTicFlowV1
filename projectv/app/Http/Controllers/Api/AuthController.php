<?php

namespace App\Http\Controllers\Api;

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


    public function redirectToAuth(): JsonResponse
    {
        return response()->json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function handleGoogleCallback(Request $request): JsonResponse
    {
        try {
            // Check if it's a POST request
            if ($request->isMethod('post')) {
                // Process the POST request here (e.g., store data in the database)
                $code = $request->input('code');
                // Your logic to handle the authorization code
                // ...
                return response()->json(['message' => 'POST request handled successfully']);
            }
    
            // If it's a GET request, proceed with the original Google login logic
            $googleUser = Socialite::driver('google')->stateless()->user();
    
            if (!$googleUser->email) {
                return response()->json(['error' => 'Google login failed: Unable to retrieve user email.'], 500);
            }
    
            $user = User::where('email', $googleUser->email)->first();
    
            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'password' => bcrypt(\Illuminate\Support\Str::random(16)),
                ]);
            }
    
            $token = $user->createToken('main')->plainTextToken;
    
            return response(compact('user', 'token'));
        } catch (\Exception $e) {
            \Log::error('Google login failed: ' . $e->getMessage());
            return response()->json(['error' => 'Google login failed: ' . $e->getMessage()], 500);
        }
    }
    
    
}