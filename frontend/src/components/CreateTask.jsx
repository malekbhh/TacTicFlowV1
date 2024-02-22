import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
function CreateTask({ tasks, setTasks }) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", //can be in progress or closed
  });
  console.log(task);
  return (
    <div>
      <form action="">
        <input
          type="text"
          className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
          onChange={(e) =>
            setTask({ ...task, id: uuidv4(), name: e.target.value })
          }
        />
        <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
