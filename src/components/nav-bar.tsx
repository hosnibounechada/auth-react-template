import React, { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "../apis/axios";
import { useAuth, useNavigate } from "../hooks";
import useRequestPrivate from "../hooks/use-request-private";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const { doRequestPrivate } = useRequestPrivate({ url: "/logout", method: "get" });

  const [navbarOpen, setNavbarOpen] = useState(false);

  const { doNavigate } = useNavigate({ page: "/" });

  const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // try {
    //   const res = axios.get("/logout", { headers: { Authorization: `Bearer ${auth.user?.accessToken}` } });
    //   if (!res) return;
    //   setAuth({ user: null });
    //   doNavigate();
    // } catch (err) {}
    const response = await doRequestPrivate();
    if (!response) return;
    setAuth({ user: null });
    doNavigate();
  };

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-600 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link to="/" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
            App Name
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
          {!auth.user ? (
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link to="/register" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <span className="ml-2">Sign-up</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <span className="ml-2">Login</span>
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
              {/* <li className="nav-item">
                <Link to="/login" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <span className="ml-2">Logout</span>
                </Link>
              </li> */}
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
    </nav>
  );
};

export default Navbar;
