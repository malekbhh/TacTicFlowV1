<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator; 
class TaskController extends Controller
{
   

    public function getTasksByProjectId($projectId) {
        $tasks = Task::where('project_id', $projectId)->get();
        return response()->json($tasks);
    }
    
    public function createTask(Request $request, $projectId) {
        $task = new Task();
        $task->title = $request->title;
        $task->project_id = $projectId;
        $task->status = 'To Do'; // Définir le statut par défaut
        $task->save();
    
        return response()->json($task, 201);
    }
    public function updateTaskStatus(Request $request, $taskId) {
        $validator = Validator::make($request->all(), [
          'status' => 'required|in:To Do,Doing,Done', // Ensure valid status
        ]);
      
        if ($validator->fails()) {
          return response()->json($validator->errors(), 400);
        }
      
        try {
          $task = Task::findOrFail($taskId);
          $task->status = $request->get('status'); // Access status from request body
          $task->save();
      
          return response()->json($task);
        } catch (\Exception $e) {
          return response()->json(['error' => 'Failed to update task status.'], 500);
        }
      }
        
      public function deleteTask($taskId)
      {
          try {
              // Recherchez la tâche à supprimer
              $task = Task::findOrFail($taskId);
              // Supprimez la tâche
              $task->delete();
  
              return response()->json(['message' => 'Task deleted successfully']);
          } catch (\Exception $e) {
              return response()->json(['error' => 'Failed to delete task'], 500);
          }
      }
  
}    