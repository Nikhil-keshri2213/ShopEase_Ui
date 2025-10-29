import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ userId, addressId, amount, orderId, paymentIntentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/payment-success",
        },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent);

        // Update payment status in your backend
        const token = localStorage.getItem("token");
        
        const response = await fetch("http://localhost:8080/api/order/update-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentIntent: paymentIntent.id,
            status: "succeeded",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Payment updated in backend:", data);
          
          // Clear cart from localStorage or your state management
          localStorage.removeItem("cart");
          
          // Navigate to success page
          navigate("/order-success", { 
            state: { 
              orderId: data.orderId,
              amount: amount 
            } 
          });
        } else {
          throw new Error("Failed to update payment status");
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage(err.message || "An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <PaymentElement id="payment-element" />
      
      <button
        disabled={isLoading || !stripe || !elements}
        className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
          isLoading || !stripe || !elements
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          `Pay ₹${amount.toFixed(2)}`
        )}
      </button>

      {message && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{message}</p>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;