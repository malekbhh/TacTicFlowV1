// CreateTask.jsx
import React, { useState } from "react";
import axiosClient from "../../axios-client";
import toast from "react-hot-toast";

function CreateTask({ projectId, setTasks }) {
  const [taskName, setTaskName] = useState("");
  const fetchTasks = async () => {
    try {
      const response = await axiosClient.get(`/projects/${projectId}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const handleCreateTask = async () => {
    try {
      const response = await axiosClient.post(`/projects/${projectId}/tasks`, {
        title: taskName,
      });
      toast.success("Task created successfully!");
      setTaskName("");
      // Recharge la page actuelle
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task. Please try again.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        className="border-2  border-gray-300 rounded-md p-2 mr-2 focus:outline-none"
      />
      <button
        onClick={handleCreateTask}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Create Task
      </button>
    </div>
  );
}

export default CreateTask;
