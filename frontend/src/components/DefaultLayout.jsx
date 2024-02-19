import React from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
const DefaultLayout = () => {
  const { user, token, setUser, setToken } = useStateContext();

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);
  return (
    <div className="flex min-h-screen">
      <aside className="w-48 bg-purple-800 p-4">
        <Link to="/dashboard" className="block py-2 text-white hover:underline">
          Dashboard
        </Link>
        <Link to="/user" className="block py-2 text-white hover:underline">
          Users
        </Link>
      </aside>
      <div className="flex-1 p-4">
        <header className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Header</div>

          <div className="flex items-center">
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
