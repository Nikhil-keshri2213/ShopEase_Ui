import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutPayment";

const stripePromise = loadStripe(
  "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
);

const PaymentPage = ({ amount, userId, addressId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!amount) {
      setError("Amount missing");
      return;
    }

    console.log("Creating payment intent for:", amount);

    fetch("http://localhost:8080/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(Number(amount) * 100), // convert to paise
        currency: "inr",
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Payment intent response:", data);
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("clientSecret not returned by backend");
        }
      })
      .catch((err) => {
        console.error("Error creating payment intent:", err);
        setError("Failed to initialize payment");
      });
  }, [amount]);

  const options = { clientSecret, appearance: { theme: "flat" } };

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm userId={userId} addressId={addressId} amount={amount} />
        </Elements>
      ) : (
        <p>Loading payment...</p>
      )}
    </div>
  );
};

export default PaymentPage;
