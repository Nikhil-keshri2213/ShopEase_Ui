import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import content from "./data/content.json";

function Layout() {
  return (
    <>
      <Navigation />
        <main>
            <Outlet />
        </main>
      <Footer content={content?.footer} />
    </>
  );
}

export default Layout;
