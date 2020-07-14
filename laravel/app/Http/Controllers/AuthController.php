<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Laravel\Passport\Client;
use Firebase\Auth\Token\Exception\InvalidToken;

class AuthController extends Controller
{

      public function authUser(Request $request){
        $auth = app('firebase.auth');
        $idTokenString = $request->input('accessToken');
        $serviceProvider = $request->input('serviceProvider');
        $verifiedIdToken = $auth->verifyIdToken($idTokenString);

        if($serviceProvider == 'phone_number'){
          $user = User::where('phone_number',$verifiedIdToken->getClaim('phone_number'))->first();
          if(!$user){
            $user = User::create([
                'phone_number' => $verifiedIdToken->getClaim('phone_number'),
                'firebase_uid' => $verifiedIdToken->getClaim('sub')
            ]);
          }
        }
        if($serviceProvider == 'email'){
          $user = User::where('email',$verifiedIdToken->getClaim('email'))->first();
          if(!$user){
            $user = User::create([
              'email' =>  $verifiedIdToken->getClaim('email'),
              'firebase_uid' => $verifiedIdToken->getClaim('sub')
            ]);
          }
        }
      
          $tokenResult = $user->createToken('Personal Access Token');

          $token = $tokenResult->token;
          $token->expires_at = Carbon::now()->addWeeks(1);
          $token->save();

          return response()->json([
            'id' => $user->id,
            'user' => $user,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
              $tokenResult->token->expires_at
            )->toDateTimeString()
          ]);
      }
}


