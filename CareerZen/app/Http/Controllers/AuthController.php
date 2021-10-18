<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    // Success code
    private $status_code    =        200;

    /**
     * Register function
     * Add form validation in server level.
     * Then return a valid User
     */
    public function register(Request $request) 
    {
        
        // Use validator to validate input
         $validator  =  Validator::make($request->all(), [
            "name" => "required",
            "email" =>"required|email|unique:users",
            "password" => "required|min:6"
        ]);
        //  if validator fails return a response
        if($validator->fails()) {
            return response()->json([
                "status" => "failed", 
                "message" => "validation_error", 
                "errors" => $validator->errors()
                ]);
        }

        // Save everything in userDataArray
        $userDataArray = array(
            "name" => $request -> name,
            "email" => $request -> email,
            "password" => Hash::make($request -> password)
        );

        // Check id email already exists , return message accordingly.
        $user_status = User::where("email", $request->email)->first();

        if(!is_null($user_status)) {
           return response()->json([
               "status" => "failed", 
               "success" => false, 
               "message" => "Email already registered"]);
        }
        // Create a User , generate token
        $user  =  User::create($userDataArray);
        

        if(!is_null($user)) {
            
            $user -> save();
            $token = $user->createToken($user -> email.'-'.now());

            return response()->json([
                "status" => $this->status_code, 
                "success" => true, 
                "message" => "Registration completed successfully", 
                "data" => $user,
                "token" => $token -> accessToken
                ]);
        }

        else {
            return response()->json([
                "status" => "failed", 
                "success" => false, 
                "message" => "failed to register"]);
        }

    }

    /**
     * Login Function
     * Add form Validation in server level.
     * Then return an authenticated user.
     */
    public function login(Request $request){
         
        $validator = Validator::make($request->all(), [
             "email" => "required|email|exists:App\Models\User,email",
             "password" => "required|min:6"
            ]);
        
        // Email Check fails
        if($validator->fails()) {
            return response()->json([
                "status" => "failed", 
                "validation_error" => $validator->errors()
                ]);
        }
        
        if (Auth::attempt([
             "email" => $request -> email,
             "password" => $request -> password
         ])){
            $user = Auth::user();
            $token = $user->createToken($user -> email.'-'.now());
            return response()->json([
                "status" => $this->status_code, 
                "success" => true, 
                "message" => "You have logged in successfully", 
                "user" => $user, 
                "token" => $token -> accessToken
            ]);
            
         } else {
            //  return response()-> json(["error" => "UnAuthorised"]);
            // Password Check Fails
             return response()->json([
                 "status" => "failed", 
                 "success" => false, 
                 "message" => "Unable to login. Incorrect password "]);
         }

    }

    /**
     * Retrieve user details
     */
    public function userDetail() {
        return Auth::user();
        // return $user;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
