<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $projects = $user->projects;
        return response()->json($projects);
    }

    public function show($projectId)
    {
        $project = Project::findOrFail($projectId);
        return response()->json($project);
    }
    
    

    public function store(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $project = $user->projects()->create($validatedData);

        return response()->json($project, 201);
    }
    public function update(Request $request, Project $project)
    {
        $user = Auth::user();

        if ($project->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $project->update($validatedData);

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        // Assurez-vous que le projet appartient à l'utilisateur authentifié
        if ($project->user_id !== auth()->id()) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        // Supprimez le projet de la base de données
        $project->delete();

        // Répondre avec un statut de succès
        return response()->json(['message' => 'Projet supprimé avec succès']);
    }
    public function showProject(Request $request, $idOrProject)
    {
        $user = Auth::user();
    
        if ($idOrProject instanceof Project) {
            $project = $idOrProject;
        } else {
            $project = Project::where('title', $idOrProject)->first();
        }
    
        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }
    
        if ($project->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
    
        return response()->json($project);
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
