import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/common";
import { GoogleSignIn } from "../../components/Button/GoogleSignin";
import { registerAPI } from "../../api/authentication";
import { VerifyCode } from "./VerifyCode";

export const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [enableVerify, setEnableVerify] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");

      if (values.password !== values.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      dispatch(setLoading(true));
      registerAPI(values)
        .then((res) => {
          if (res?.code === 200) {
            setEnableVerify(true);
          } else {
            setError("Something went wrong!");
          }
        })
        .catch(() => {
          setError("Invalid input or Email already exists!");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, values]
  );

  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target?.value,
    }));
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {!enableVerify && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Create your account
            </h2>

            <GoogleSignIn />

            <p className="text-gray-500 text-center my-4">OR</p>

            {error && (
              <p className="text-sm text-red-600 text-center mb-4">{error}</p>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleOnChange}
                placeholder="First Name"
                className="h-12 w-full border p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
              />

              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleOnChange}
                placeholder="Last Name"
                className="h-12 w-full border p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
              />

              <input
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleOnChange}
                placeholder="Phone Number"
                className="h-12 w-full border p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
              />

              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleOnChange}
                placeholder="Email Address"
                className="h-12 w-full border p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
              />

              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleOnChange}
                placeholder="Password"
                className="h-12 w-full border p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
                autoComplete="new-password"
              />

              <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="h-12 w-full border p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
                autoComplete="new-password"
              />

              <button className="w-full h-12 rounded-lg bg-black text-white font-medium hover:opacity-80 transition">
                Sign Up
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to={"/v1/login"}
                className="text-black font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </>
        )}

        {enableVerify && <VerifyCode email={values?.email} />}
      </div>
    </div>
  );
};
