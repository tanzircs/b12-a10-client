import React, { useState } from 'react';
import { Link } from 'react-router';
import logo from "../assets/logo.jpg"

const Navbar = () => {

const [open, setOpen] = useState(false);

    return (
      <nav className="bg-white  shadow-sm sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="EcoTrack Logo" className="h-8 w-8" />
            <span className="font-semibold text-xl">EcoTrack</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/challenges">Challenges</Link>
            <Link to="/activities">My Activities</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="px-3 py-1 border rounded">
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-black text-white rounded"
            >
              Register
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {open && (
          <div className="md:hidden px-4 pb-4 space-y-3">
            <Link to="/">Home</Link> <br />
            <Link to="/challenges">Challenges</Link> <br />
            <Link to="/activities">My Activities</Link>
            <hr />
            <Link to="/login">Login</Link> <br />
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    );
};

export default Navbar;