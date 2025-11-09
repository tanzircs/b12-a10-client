import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const PublicLayout = () => {
    return <div className="flex flex-col min-h-screen">
        <Navbar></Navbar>
        <main><Outlet></Outlet></main>
        <Footer></Footer>
    </div>;
};

export default PublicLayout;