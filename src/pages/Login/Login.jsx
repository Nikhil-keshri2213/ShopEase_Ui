import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/common.js";
import GoogleSignIn from "../../components/Button/GoogleSignIn.jsx";
import { loginAPI } from "../../api/authentication";
import { saveToken } from "../../Utils/jwt-helper.js";

export const Login = () => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      dispatch(setLoading(true));
      loginAPI(values)
        .then((res) => {
          if (res?.token) {
            saveToken(res?.token);
            navigate("/");
          } else {
            setError("Something went wrong!");
          }
        })
        .catch(() => {
          setError("Invalid Credentials!");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, navigate, values]
  );

  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target?.value,
    }));
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <GoogleSignIn />

        <p className="text-gray-500 text-center my-4">OR</p>

        {error && (
          <p className="text-sm text-red-600 text-center mb-4">{error}</p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            name="userName"
            value={values?.userName}
            onChange={handleOnChange}
            placeholder="Email address"
            className="h-12 w-full border p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
            required
          />

          <input
            type="password"
            name="password"
            value={values?.password}
            onChange={handleOnChange}
            placeholder="Password"
            className="h-12 w-full border p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
            required
            autoComplete="new-password"
          />

          <div className="flex justify-end">
            <Link className="text-sm text-gray-500 hover:text-black underline">
              Forgot Password?
            </Link>
          </div>

          <button className="w-full h-12 rounded-lg bg-black text-white font-medium hover:opacity-80 transition">
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to={"/v1/register"}
            className="text-black font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
