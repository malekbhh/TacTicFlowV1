<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;

use Illuminate\Routing\Middleware\ThrottleRequests;

use App\Models\Project; // Add this line to import the Project model
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function show(Project $project)
    {
        return response()->json($project);
    }

    public function store(Request $request)
    {
        // Ensure the current user is correctly retrieved
        $user = $request->user();
    
        // Create a new project associated with the current user
        $project = $user->projects()->create($request->all());
    
        // Return the newly created project in the response
        return response()->json($project, 201);
    }
    
    
    

   
}

