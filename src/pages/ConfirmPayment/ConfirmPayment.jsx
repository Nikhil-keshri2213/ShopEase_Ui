import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPaymentAPI } from "../../api/order.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import { clearCart } from "../../store/actions/cartAction.js";

const ConfirmPayment = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const isLoading = useSelector((state) => state?.commonState?.loading);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const clientSecret = query.get("payment_intent_client_secret");
    const redirectStatus = query.get("redirect_status");
    const paymentIntent = query.get("payment_intent");

    if (redirectStatus === "succeeded") {
      dispatch(setLoading(true));
      dispatch(clearCart());

      confirmPaymentAPI({
        paymentIntent,
        status: redirectStatus,
      })
        .then((res) => {
          const orderId = res?.orderId;
          navigate(`/orderConfirmed?orderId=${orderId}`);
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage("Something went wrong!");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      setErrorMessage("Payment Failed - " + redirectStatus);
    }
  }, [dispatch, location.search, navigate]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-medium">Processing Payment...</div>
      </div>
      {isLoading && <Spinner />}
      {errorMessage && (
        <div className="text-red-600 text-center mt-4">{errorMessage}</div>
      )}
    </>
  );
};

export default ConfirmPayment;
