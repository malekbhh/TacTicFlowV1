import { React, useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal.jsx";
import HeaderDropdown from "./HeaderDropdown.jsx";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTasks, faHome } from "@fortawesome/free-solid-svg-icons";

const DefaultLayout = () => {
  const { user, token, setUser, setToken, photoUser, setPhotoUser } =
    useStateContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  useEffect(() => {}, [token, user, setUser]);
  const getInfo = () => {
    // Récupérer les données de l'utilisateur (y compris l'URL de l'avatar) lors du chargement initial
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  };
  getInfo();
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

  if (!token || !user) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="bg-gray-100">
      <nav className="fixed top-0  left-64 z-50 right-0  pt-2 bg-gray-100 dark:bg-gray-900  ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm  rounded-lg sm:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
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
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
            </div>

            {/* right side  */}
            <div className="flex  space-x-4 items-center md:space-x-6">
              <div className="flex absolute left-12 top-5  md:top-8 items-center justify-start">
                {/* Ajout de l'icône et du texte "Dashboard" */}
                <Link to="/">
                  <span className="flex ml-3 items-start space-x-1  text-midnightblue  dark:text-gray-400 font-medium text-lg">
                    <FontAwesomeIcon icon={faHome} className="w-5 mt-1 h-5" />
                    <span className="dark:text-gray-400 text-midnightblue">
                      Dashboard
                    </span>
                  </span>
                </Link>
              </div>
              <div className="flex space-x-4 items-center md:space-x-6">
                <button
                  className="bg-midnightblue py-2 px-4 rounded-full 
        text-white text-base font-semibold hover:opacity-80
        duration-200 button hidden md:block dark:bg-indigo-500"
                  onClick={() => {
                    setBoardModalOpen((state) => !state);
                  }}
                >
                  +Add New Board
                </button>
                <button
                  className="button p-1 px-3 md:hidden"
                  onClick={() => {
                    setOpenAddEditTask((state) => !state);
                  }}
                >
                  +
                </button>
              </div>

              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    onClick={handleDropdownToggle}
                    className="flex text-sm  rounded-full "
                    aria-expanded={isDropdownOpen}
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>

                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <svg
                        className="h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } z-50 absolute right-0 mt-60 mr-11 w-56 text-base list-none bg-white divide-y rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {user.name} &nbsp; &nbsp;
                    </div>
                    <div className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                      {user.email}
                    </div>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/projects"
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Projects
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="./profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit Profil
                      </Link>
                    </li>
                    <li>
                      <button onClick={onLogout}>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed -translate-y-10 left-0 bg-white dark:bg-gray-900 z-40 w-64 h-screen pt-5 transition-transform -translate-x-full  border-r border-gray-200 sm:translate-x-0  dark:border-gray-700"
      >
        <div className="h-full px-3  overflow-y-auto  bg-white dark:bg-gray-900">
          <a href="https://tac-tic.net/" className="flex pb-4 items-center ">
            <img
              src="/logo2.png"
              className="h-12 mr-1 md:h-8 lg:h-12"
              alt="TacTicFlowLogo"
            />
            <span
              className={` text-2xl  font-bold font-inherit mt-1 dark:text-white text-[#212177]  ${
                typeof window !== "undefined" && window.innerWidth < 600
                  ? "text-lg"
                  : ""
              }`}
              style={{
                letterSpacing: window.innerWidth < 600 ? "2px" : "4px",
              }}
            >
              actiwFlow
            </span>
          </a>
          <ul className="space-y-6 mt-4 ml-4 font-medium">
            <li>
              <Link to="/projects">
                <a
                  href="#"
                  className="logo flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
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
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Projects
                  </span>
                </a>
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Profil</span>
              </Link>
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

      <div className="sm:ml-64 dark:bg-slate-900 h-screen">
        <div className="  rounded-lg dark:border-gray-700 mt-10">
          <div className="flex  items-center justify-center pt-6 rounded  ">
            {boardModalOpen && (
              <AddEditBoardModal
                type={boardType}
                setBoardModalOpen={setBoardModalOpen}
              />
            )}

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
