import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import logo from "../assets/logo.jpg";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().catch((err) => console.error(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/challenges">Challenges</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/my-activities"}>My Activities</NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBars className="h-5 w-5" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
              {!user && (
                <>
                  <li className="mt-2">
                    <Link
                      to="/login"
                      className="btn btn-outline btn-success w-full"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="/register" className="btn btn-success w-full">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl gap-2">
            <img src={logo} alt="EcoTrack Logo" className="h-8 w-8" />
            <span className="font-semibold">EcoTrack</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user.photoURL ||
                      "https://api.lorem.space/image/face?hash=33791"
                    }
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="px-4 py-2 font-medium">
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link to="/my-profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/my-activities">My Activities</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login" className="btn btn-outline btn-success">
                Login
              </Link>
              <Link to="/register" className="btn btn-success">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
