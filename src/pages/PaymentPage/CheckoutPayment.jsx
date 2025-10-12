import React, { useCallback, useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { placeOrderAPI } from "../../api/order";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/features/cart";
import { createOrderRequest } from "../../utils/order-util";
import { setLoading } from "../../store/features/common";

const CheckoutForm = ({ userId, addressId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      dispatch(setLoading(true));
      setError("");

      if (!stripe || !elements) {
        setError("Stripe not loaded");
        dispatch(setLoading(false));
        return;
      }

      try {
        // confirm payment first
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:5173/confirmPayment",
          },
        });

        if (result.error) {
          setError(result.error.message);
          return;
        }

        // Only if payment succeeds → create order
        const orderRequest = createOrderRequest(cartItems, userId, addressId, amount);
        await placeOrderAPI(orderRequest);

      } catch (err) {
        setError("Order or payment failed");
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [addressId, cartItems, dispatch, elements, stripe, userId, amount]
  );

  return (
    <form
      className="items-center p-4 mt-4 w-[380px] h-auto bg-white rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold mb-4">Enter Payment Details</h2>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full items-center h-[48px] bg-black border rounded-lg mt-6 text-white hover:bg-gray-800 transition"
      >
        Pay Now
      </button>
      {error && <p className="text-sm pt-4 text-red-600">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
