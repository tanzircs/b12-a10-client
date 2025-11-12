import React from "react";
import Navbar from "../Component/Navbar";
import { Outlet } from "react-router";
import Footer from "../Component/Footer";
import { ToastContainer } from "react-toastify";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default PublicLayout;
