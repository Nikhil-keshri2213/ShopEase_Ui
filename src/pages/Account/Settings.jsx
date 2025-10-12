import React, { useCallback } from "react";
import { logOut } from "../../utils/jwt-helper";
import { useNavigate } from "react-router-dom";
import { Shield, Trash2, UserCog, LogOut } from "lucide-react"; // icons

const Settings = () => {

  const onDeactivate = useCallback(() => {

    alert("Your account will be deactivated. (Implement API call here)");
  }, []);

  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

      <div className="grid gap-6 max-w-2xl">
        <div className="flex items-center justify-between bg-white border rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-4">
            <Shield className="w-6 h-6 text-yellow-600" />
            <div>
              <h2 className="font-semibold text-gray-800">Deactivate Account</h2>
              <p className="text-sm text-gray-500">
                Temporarily disable your account and restore it later.
              </p>
            </div>
          </div>
          <button
            onClick={onDeactivate}
            className="text-sm px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
