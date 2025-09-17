import React from "react";
import Navigation from "../components/Navigation/Navigation";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner/Spinner";

import LoginImg from "../assets/img/bg-1-n.jpg";   // login specific image
import RegisterImg from "../assets/img/bg-2.jpg"; // register specific image

function AuthenticationWrapper() {
  const isLoading = useSelector((state) => state?.commonState?.loading);
  const location = useLocation();

  // Decide which image to show based on route
  const currentPath = location.pathname;
  let BgImg = null;

  if (currentPath.includes("/v1/login")) {
    BgImg = LoginImg;
  } else if (currentPath.includes("/v1/register")) {
    BgImg = RegisterImg;
  }

  return (
    <div>
      <Navigation variant="auth" />
      <div className="flex">
        {/* Left side image */}
        <div className="w-[60%] lg:w-[70%] hidden md:inline py-2">
          {BgImg && (
            <img
              src={BgImg}
              alt="Authentication Background"
              className="bg-cover w-full h-full object-cover"
            />
          )}
        </div>

        {/* Right side auth forms */}
        <div className="flex-1">
          <Outlet />
        </div>

        {isLoading && <Spinner />}
      </div>
    </div>
  );
}

export default AuthenticationWrapper;
