import { React, useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal.jsx";
import HeaderDropdown from "../components/HeaderDropdown.jsx";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTasks, faHome } from "@fortawesome/free-solid-svg-icons";
//color dark:bg-[#F35F34]
const Dashboardd1 = () => {
  const [activeItem, setActiveItem] = useState(1);
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const { user, token, setUser, setToken } = useStateContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  useEffect(() => {
    if (token && user) {
      axiosClient.get("/user").then(({ data }) => {
        setUser(data);
      });
    }
  }, [token, user, setUser]);

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
    <div className="dark:bg-[#150E39] bg-gray-100  h-screen">
      <nav className="fixed  top-3 z-50 w-full  ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm  rounded-lg sm:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              >
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
            <div className="flex space-x-4   items-center md:space-x-4">
              <div className="flex absolute left-12 top-5 md:left-72 md:top-8 items-center justify-start">
                {/* Ajout de l'icône et du texte "Dashboard" */}
                <Link to="/">
                  <span className="flex ml-3 items-start space-x-1 text-white  dark:text-gray-400 font-medium text-lg">
                    <FontAwesomeIcon
                      icon={faHome}
                      className="w-5 text-midnightblue dark:text-gray-400 mt-1 h-5"
                    />
                    <span className="dark:text-gray-400 text-midnightblue">
                      / Dashboard
                    </span>
                  </span>
                </Link>
              </div>
              <div className="flex bg-white dark:bg-slate-900  rounded-full space-x-4 items-center ">
                <button
                  className=" gradient-text text-white shadow-lg bg-midnightblue bg-gray-[#DADBDD] dark:bg-indigo-500 dark:text-white py-2 px-4 rounded-full 
        text-base font-semibold hover:opacity-80
        duration-200 button hidden md:block"
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

              <div className="flex items-center  ">
                <div>
                  <button
                    type="button"
                    onClick={handleDropdownToggle}
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isDropdownOpen}
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } z-50 absolute right-0 mt-60 text-base list-none bg-white divide-y rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
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
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Projects
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit Profil
                      </a>
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
        className="
          top-5
          left-3
    
        rounded-2xl
          absolute
          z-40
          w-64
          h-[96%]
          pt-4  pl-1
          transition-transform
          -translate-x-full
          sm:translate-x-0 
bg-white shadow-lg
          dark:bg-gradient-to-b  dark:from-[#251F54] dark:to-[#150E35]
          dark:border-gray-700
        "
      >
        {" "}
        <div className=" px-3    ">
          <div className="flex items-start justify-start  pb-4    ">
            <Link to="/">
              <span className="flex items-center space-x-1 font-bold text-xl ">
                <img
                  src="/logo2.png"
                  className="w-10 h-10 rounded-full"
                  alt="TacTicFlowLogo"
                />
                <span className="text-2xl tracking-[0.19em] text-midnightblue font-bold dark:text-white ">
                  acticFlow
                </span>
              </span>
            </Link>
          </div>
          <ul className="space-y-6 mt-4 ml-4 font-medium">
            <li>
              <Link to="/projects">
                <a
                  href="#"
                  className="flex items-center hover:text-gray-900 p-2 text-midnightblue rounded-lg
                  dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
                >
                  {" "}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-midnightblue transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
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
              <a
                href="#"
                className="flex items-center hover:text-gray-900 p-2 text-midnightblue rounded-lg
                dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-5 h-5 text-midnightblue transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Profil</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center hover:text-gray-900 p-2 text-midnightblue rounded-lg
                dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
              >
                <FontAwesomeIcon
                  icon={faTasks}
                  className="w-5 h-5 text-midnightblue transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Progress</span>
              </a>
            </li>

            <li>
              <Link
                to="/user"
                className="flex items-center hover:text-gray-900 p-2 text-midnightblue rounded-lg
                dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
              >
                {" "}
                <svg
                  className="flex-shrink-0 w-5 h-5 text-midnightblue transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
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
                className="flex items-center hover:text-gray-900 p-2 text-midnightblue rounded-lg
                dark:text-white hover:bg-gray-100 dark:hover:bg-indigo-500 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-midnightblue transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
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

      <div className="sm:ml-64">
        <div className="  rounded-lg dark:border-gray-700 ">
          <div className="flex items-center justify-center rounded  ">
            {boardModalOpen && (
              <AddEditBoardModal
                type={boardType}
                setBoardModalOpen={setBoardModalOpen}
              />
            )}
            <div className=" dark: z-70 top-0 rounded-l-[50px] h-screen w-[2000px]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardd1;
