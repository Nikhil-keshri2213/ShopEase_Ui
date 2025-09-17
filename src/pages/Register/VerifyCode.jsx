import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { verifyAPI } from '../../api/authentication';

export const VerifyCode = ({ email }) => {
  const [values, setValues] = useState({
    userName: email,
    code: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError('');
      dispatch(setLoading(true));

      verifyAPI(values)
        .then(() => {
          setMessage(
            'Thank you! Your email has been successfully verified. You can now log in to your account.'
          );
        })
        .catch(() => {
          setError(
            'The verification code you entered is incorrect or has expired.'
          );
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
    <div className="p-4">
      {!message && (
        <>
        <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>
          <p className="text-lg text-blue-900">
            Registration successful! Please check your email for the verification
            code to complete your registration.
          </p>
          <p className="text-lg text-gray-600 pt-4 font-bold">
            Please enter the 6-digit verification code sent to your email to
            verify your account.
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              name="code"
              value={values.code}
              maxLength={6}
              onChange={handleOnChange}
              placeholder="6 digit code"
              className="h-[48px] border rounded border-gray-600 p-2"
              required
            />
            <button
              type="submit"
              className="border w-full rounded-lg h-[48px] bg-black text-white mb-4 hover:opacity-80"
            >
              Verify
            </button>
          </form>
          {error && <p className="text-lg text-red-600">{error}</p>}
        </>
      )}

      {message && <><p className="text-lg">{message}</p><p className="text-sm text-center text-black font-semibold hover:underline mt-6">
        
        <Link
          to={"/v1/login"}>
          Click Here to Log in
        </Link>
      </p></>}
    </div>
  );
};