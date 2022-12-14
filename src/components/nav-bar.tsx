import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../hooks/use-logout";

const Navbar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { doLogout } = useLogout();

  const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await doLogout();
    navigate("/");
  };

  return (
    <header className="relative flex flex-wrap items-center justify-between bg-indigo-600">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link to="/" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
            <div className="flex items-center">
              <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" />
              <span className="px-1">App Name</span>
            </div>
          </Link>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")} id="example-navbar-danger">
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <Link to="/private" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                <span className="ml-2">Private</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chat" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                <span className="ml-2">Chat</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/friends" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                <span className="ml-2">Friends</span>
              </Link>
            </li>
          </ul>
          {!auth.user ? (
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className={`${location.pathname === "/login" ? "hidden" : ""} nav-item w-20`}>
                <Link to="/login" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <span className="ml-2">Log in</span>
                </Link>
              </li>
              <li className={`${location.pathname === "/register" ? "hidden" : ""} nav-item w-20`}>
                <Link
                  to="/register"
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-indigo-600 bg-white hover:opacity-75 rounded-md"
                >
                  <span className="ml-2">Sign up</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link to="/home" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <span className="ml-2">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={(e) => onLogout(e)}
                >
                  <span className="ml-2">Logout</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
