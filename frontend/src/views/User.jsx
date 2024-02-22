import React, { useState } from "react";
import CreateTask from "../components/CreateTask";
import ListTasks from "../components/ListTasks";

function User() {
  const [tasks, setTasks] = useState([]);
  return (
    <div className="bg-slate-100 w-screen h-screen flex flex-col items-center gap-16 pt-3 ">
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default User;
