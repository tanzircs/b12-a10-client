import React, { use,  useState } from "react";
import { NavLink } from "react-router";
import logo from "../assets/logo.jpg";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);

    const activeClass = "border-b-2 border-black pb-1";
    
     const { user } = use(AuthContext); 

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="EcoTrack Logo" className="h-8 w-8" />
          <span className="font-semibold text-xl">EcoTrack</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/challenges"
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Challenges
          </NavLink>
          <NavLink
            to="/activities"
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            My Activities
          </NavLink>
          <NavLink
            to="/tips"
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Tips
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Events
          </NavLink>
        </div>

              {
                  user? user?.displayName: <div className="hidden md:flex items-center gap-4">
          <NavLink to="/login" className="px-3 py-1 border rounded">
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-3 py-1 bg-black text-white rounded"
          >
            Register
          </NavLink>
        </div>
        }

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/challenges">Challenges</NavLink>
          <br />
          <NavLink to="/activities">My Activities</NavLink>
          <br />
          <NavLink to="/tips">Tips</NavLink>
          <br />
          <NavLink to="/events">Events</NavLink>
          <hr />
          <NavLink to="/login">Login</NavLink>
          <br />
          <NavLink to="/register">Register</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
