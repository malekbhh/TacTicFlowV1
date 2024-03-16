import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import Alert from "./Alert";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const loadTasks = async () => {
    try {
      const response = await axiosClient.get(`/tasks/${projectId}`);
      setProject((prevProject) => ({
        ...prevProject,
        toDoTasks: response.data,
      }));
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const loadProjectDetails = async () => {
    try {
      const response = await axiosClient.get(`/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error loading project details:", error);
    }
  };

  const handleAddTask = async () => {
    if (!projectId) {
      console.error("ProjectId is not defined");
      return;
    }

    if (newTask.trim() === "") {
      setAlertType("danger");
      setAlertMessage("Please enter a task title.");
      setShowAlert(true);
      return;
    }

    try {
      // Envoyer une requête POST pour ajouter une nouvelle tâche au projet
      const response = await axiosClient.post(`/projects/${projectId}/tasks`, {
        title: newTask,
      });

      // Mettre à jour l'état local avec la nouvelle tâche ajoutée
      setProject((prevProject) => ({
        ...prevProject,
        toDoTasks: prevProject.toDoTasks
          ? [...prevProject.toDoTasks, response.data]
          : [response.data],
      }));

      // Effacer le champ newTask et afficher un message de succès
      setNewTask("");
      setAlertType("success");
      setAlertMessage("Task added successfully!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding task:", error);
      setAlertType("danger");
      setAlertMessage("Error adding task. Please try again.");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    loadProjectDetails();
    loadTasks();
  }, [projectId]);

  return (
    <div className="container mx-auto pt-11 px-8 h-screen  text-gray-800 dark:text-white">
      {project ? (
        <div className="bg-white  rounded-lg ">
          <div className="p-6">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
              {project.title}
            </h2>
            <div className="mb-4 flex items-center">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add Task"
                className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none"
              />
              <button
                onClick={handleAddTask}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
              >
                Add Task
              </button>
            </div>
            {showAlert && (
              <Alert
                type={alertType}
                message={alertMessage}
                onClose={() => setShowAlert(false)}
              />
            )}
            {/* Affichage des tâches */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TaskCard
                title="To Do"
                tasks={project ? project.toDoTasks : []}
                projectId={projectId}
                updateTasks={loadTasks}
              />

              <TaskCard title="Doing" tasks={project.doingTasks} />
              <TaskCard title="Done" tasks={project.doneTasks} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading project details...</p>
      )}
    </div>
  );
};

export default ProjectDetails;
