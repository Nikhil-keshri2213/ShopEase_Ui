import React, { useCallback, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../Utils/jwt-helper.js";
import { setLoading } from "../../store/features/common.js";
import { fetchUserDetails } from "../../api/userInfo.jsx";
import { loadUserInfo, selectIsUserAdmin, selectUserInfo } from "../../store/features/user.js";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const isUserAdmin = useSelector(selectIsUserAdmin);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => {
        dispatch(loadUserInfo(res));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const onLogOut = useCallback(() => {
    logOut();
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {isUserAdmin && (
        <div className="text-right mb-4">
          <Link to={"/admin"} className="text-blue-600 hover:underline font-medium">
            Manage Store as Admin
          </Link>
        </div>
      )}

      {userInfo?.email && (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold">
            Hello, <span className="font-bold">{userInfo?.firstName}</span>
          </h1>
          <p className="text-gray-600">Welcome to Your Account Dashboard</p>

          <div className="flex flex-col md:flex-row mt-8 gap-6">
            {/* Sidebar */}
            <ul className="w-full md:w-64 space-y-3">
              {[
                { to: "/account-details/profile", label: "Profile" },
                { to: "/account-details/orders", label: "Orders" },
                { to: "/account-details/settings", label: "Settings" },
              ].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg border transition
                       ${
                         isActive
                           ? "bg-black text-white border-black"
                           : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                       }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  onClick={onLogOut}
                  className="w-full px-4 py-3 rounded-lg border border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  Logout
                </button>
              </li>
            </ul>

            {/* Content */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-6">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
