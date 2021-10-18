<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{

    // Success code
    private $status_code    =        200;

    // apply auth middleware so only authenticated users have access

	public function __construct() {
		$this->middleware('auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        // dd(Auth::check());
        // if (Auth::check()) {
        // The user is logged in...}
        $allTasks = Task::where('user_id', Auth::id())->get();

        if(!empty($allTasks)) {
            return Response()->json([
                'tasks' => $allTasks,
                'status' => $this->status_code,
            ]);
        }
        // $tasks = $allTasks->orderBy('created_at','desc')->get();

        
        return response()->json([
            "message" => "No tasks Available.",
            "status" => "failed"
		]);
    }

    // /**
    //  * Show the form for creating a new resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        
        $validator = Validator::make($request->all(), [
            'title' =>'required',
            'description' =>'required',
            'status' =>'required',
            'date' => 'required',
            'time' => 'required'
        ]);

        

        // $validated = $request->validate([
        //     'title' => 'required',
        //     'description' => 'required',
        //     'status' => 'required'
        // ]);

        // 
        if($validator->fails()) {
            return response()->json([
                "status" => "failed", 
                "message" => "validation_error", 
                "errors" => $validator->errors()
                ]);
            // return dd($request-> all());
        }

        $newTask = array(
            'title' => $request-> title,
            'description' => $request-> description,
            'user_id' => Auth::id(), 
            // Auth::user()->id,
            'status' => $request-> status,
            'date' =>  $request-> date,
            'time' => $request -> time
         );

         $task = Task::create($newTask);
         $task -> save();
         return response()->json([
             'status' => $this->status_code ,
             'entry' => $task ,
             'authUser' => Auth::id(),
             'request' => $request

             ]);

    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show($id)
    // {
    //     //
    // }

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

        $todo = Task::find($id);
        $todo->title = $request-> title;
        $todo->description = $request-> description;
        $todo->status = $request-> status;
        $todo->date =  $request-> date;
        $todo->time = $request -> time;
        $todo->save();
        // dd($todo->save());
        return response()->json([
            'status' => $this->status_code,
            'data' => $todo
        ]);

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
        return response()->json([
            'delete' => Task::find($id)->delete(),
        ]);
    }
}
