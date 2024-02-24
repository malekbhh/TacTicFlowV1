import React, { useEffect, useState } from "react";

function User() {
  const [tasks, setTasks] = useState([]);
  console.log("tasks", tasks);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);
  return <div></div>;
}

export default User;
