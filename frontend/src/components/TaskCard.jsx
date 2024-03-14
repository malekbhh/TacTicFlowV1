import React from "react";
import axiosClient from "../axios-client.js";
const TaskCard = ({ title, tasks, projectId, updateTasks }) => {
  const taskCardStyles = {
    common: `
      p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300
      overflow-hidden
    `,
    toDo: `
      bg-gradient-to-r from-sky-500 to-sky-300 
      dark:bg-gradient-to-r from-sky-700 to-sky-600 
      text-white dark:text-gray-400
    `,
    doing: `
      bg-gradient-to-r from-amber-400 to-amber-200 
      dark:bg-gradient-to-r from-amber-600 to-amber-500 
      text-gray-800 dark:text-gray-200
    `,
    done: `
      bg-gradient-to-r from-green-500 to-green-300 
      dark:bg-gradient-to-r from-green-700 to-green-600 
      text-white dark:text-gray-400
    `,
  };
  const handleDeleteTask = async (taskId) => {
    try {
      await axiosClient.delete(`/tasks/${taskId}`);
      // Mettre à jour les tâches après suppression
      updateTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div
      className={`${taskCardStyles.common} ${
        taskCardStyles[title.toLowerCase()]
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-medium">{title}</h3>
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <ul className="list-disc pl-4">
        {tasks?.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="2" />
                </svg>
                <span className="text-base font-medium">{task.title}</span>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteTask(task.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM8 9a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V10a1 1 0 0 0-1-1zm4-1a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 1 0 2 0V9zm-4-4a1 1 0 0 0-1 1v1h6V6a1 1 0 0 0-1-1H8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          ))
        ) : (
          <li className="text-center">No tasks for now.</li>
        )}
      </ul>
    </div>
  );
};

export default TaskCard;
