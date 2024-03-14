<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function deleteTask($taskId)
{
    $task = Task::find($taskId);

    if (!$task) {
        return response()->json(['error' => 'Task not found'], 404);
    }

    $task->delete();

    return response()->json(['message' => 'Task deleted successfully']);
}

    public function getTasksByProjectId($projectId) {
        $tasks = Task::where('project_id', $projectId)
                     ->where('status', 'To Do')
                     ->get();
        return response()->json($tasks);
    }
    
    

    public function addTask(Request $request, Project $project)
    {
        $user = Auth::user();
    
        // Vérifiez si l'utilisateur est authentifié
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
    
        // Vérifiez si l'utilisateur a le droit d'ajouter une tâche à ce projet
        if ($project->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
    
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
        ]);
    
        // Ajoutez la tâche au projet
        $task = $project->tasks()->create($validatedData);
    
        return response()->json($task, 201);
    }
}    