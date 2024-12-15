import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Body = () => {
    return (
        <>
            <Header />
            <div className="body-container">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Body;
