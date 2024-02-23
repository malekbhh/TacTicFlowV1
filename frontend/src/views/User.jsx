import React, { useEffect, useState } from "react";
import CreateTask from "../components/CreateTask";
import ListTasks from "../components/ListTasks";
import toast, { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function User() {
  const [tasks, setTasks] = useState([]);
  console.log("tasks", tasks);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-slate-100 pt-32 w-screen h-screen flex flex-col items-center gap-16  ">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default User;
