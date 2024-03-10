import React from "react";
import { Link } from "react-router-dom";
function NavbarHome() {
  return (
    <div>
      <nav className="   w-full z-20 top-0 start-0 shadow-md   ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://tac-tic.net/"
            className="flex items-center space-x-1 rtl:space-x-reverse"
          >
            <img src="/logo2.png" className="h-12" alt="TacTicFlowLogo" />
            <h3 className="mt-1 relative text-white text-2xl  tracking-[0.16em] font-bold font-inherit whitespace-nowrap z-[3]">
              acticFlow
            </h3>
          </a>
          <div class="flex md:order-2   space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="button-container flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
              <Link to="/login">
                <button className="login-btn translate-x-7 bg-gradient-to-r from-red-500 to-red-700 py-2.5 px-6 rounded-full text-white font-medium shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="signup-btn bg-gradient-to-r  text-red-500 font-medium hover:bg-red-100 transition duration-300 ease-in-out border  border-red-500 py-3 px-8 rounded-r-full ">
                  Signup
                </button>
              </Link>
            </div>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            class="hidden w-full md:flex md:items-center md:justify-between md:w-auto "
            id="navbar-sticky"
          >
            <ul className="flex flex-col md:flex-row justify-between md:space-x-8 items-center md:items-stretch py-4 px-4 md:px-0">
              <li>
                <Link
                  to="#"
                  className="block text-white px-4 py-2 rounded-2xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block text-white px-4 py-2 rounded-2xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block text-white px-4 py-2 rounded-2xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block text-white px-4 py-2 rounded-2xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400"
                >
                  Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarHome;
