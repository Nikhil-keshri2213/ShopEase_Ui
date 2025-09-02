import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import content from "./data/content.json";
import Spinner from "./components/Spinner/Spinner";
import { useSelector } from "react-redux";

function Layout() {

  const isLoading = useSelector((state)=> state?.commonState?.loading);

  return (
    <>
      <Navigation />
        
            <Outlet />
            {isLoading && <Spinner/>}
        
      <Footer content={content?.footer} />
    </>
  );
}

export default Layout;
