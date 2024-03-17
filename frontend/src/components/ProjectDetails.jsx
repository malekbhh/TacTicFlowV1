import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import Alert from "./Alert";
import CreateTask from "./test/CreateTask";
import ListTasks from "./test/ListTasks";
import toast, { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {}, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="dark:bg-slate-900 w-screen h-screen flex flex-col p-3 items-center pt-32 gap-16">
        <CreateTask projectId={projectId} setTasks={setTasks} />
        <ListTasks projectId={projectId} tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};
export default ProjectDetails;
