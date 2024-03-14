import { React, useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal.jsx";
import HeaderDropdown from "../components/HeaderDropdown.jsx";
import { useDispatch, useSelector } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripHorizontal,
  faTasks,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

library.add(fas, faGripHorizontal, faTasks, faUser);

function Dashboardd1() {
  const { user, token, setUser, setToken } = useStateContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div className="h-screen   pb-3 ">
      <aside
        className="
          top-5
          left-3
    
        rounded-2xl
          relative
          z-40
          w-64
          h-[96%]
          pt-4  pl-1
          transition-transform
          -translate-x-full
          border-r border-gray-200
          sm:translate-x-0
bg-gradient-to-b from-gray-100 to-gray-400
          dark:bg-gradient-to-b  dark:from-[#251F54] dark:to-[#150E35]
          dark:border-gray-700
        "
      >
        {" "}
        <div className=" px-3    ">
          <div className="flex items-start  pb-4    ">
            <Link to="/">
              <span className="flex items-center space-x-1 font-bold text-xl ">
                <img
                  src="/logo2.png"
                  className="w-10 h-10 rounded-full"
                  alt="TacTicFlowLogo"
                />
                <span className="text-2xl tracking-[0.19em] font-bold dark:text-white ">
                  acticFlow
                </span>
              </span>
            </Link>
          </div>
          <ul className="space-y-2 mt-4 font-medium">
            <li>
              <Link to="/projects">
                <a
                  href="#"
                  className="logo flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    <FontAwesomeIcon
                      icon={["fas", "grip-horizontal"]}
                      className="w-5 h-5 text-gray-500 -translate-x-3 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    />
                    Projects
                  </span>
                </a>
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Profil</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
              >
                <FontAwesomeIcon
                  icon={faTasks}
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Progress</span>
              </a>
            </li>

            <li>
              <Link
                to="/user"
                className="flex items-center p-2 text-gray-900 rounded-lg
    dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
              >
                {" "}
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                  strokeWidth="2"
                  clipRule="evenodd" // Change 'clip-rule' to 'clipRule'
                  fillRule="evenodd" // Change 'fill-rule' to 'fillRule'
                  strokeLinecap="round" // Change 'stroke-linecap' to 'strokeLinecap'
                  strokeLinejoin="round"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">User</span>
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <button onClick={onLogout}>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Sign Out
                  </span>
                </button>
              </a>
            </li>
            <li>
              <div className="fixed bottom-4 left-0 w-full">
                <HeaderDropdown
                  setBoardModalOpen={setBoardModalOpen}
                  setOpenDropdown={setOpenDropdown}
                />
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Dashboardd1;
