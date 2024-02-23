<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project; // Ajoutez cette ligne

class ProjectController extends Controller
{ 
    
    public function index()
    {
        // Récupérer tous les projets
        $projects = Project::all();

        return response()->json($projects);
    }

    public function show($id)
    {
        // Récupérer les détails du projet
        $project = Project::findOrFail($id);
        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        // Valider la requête
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);
        
        // Mettre à jour les détails du projet
        $project = Project::findOrFail($id);
        $project->update($data);

        return response()->json($project, 200);
    }

    public function store(Request $request)
    {
        // Valider la requête
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        // Créer un nouveau projet
        $project = auth()->user()->projects()->create($data);

        return response()->json($project, 201);
    }

    public function destroy(Project $project)
    {
        // Supprimer le projet
        $project->delete();

        return response()->json(null, 204);
    }
}
