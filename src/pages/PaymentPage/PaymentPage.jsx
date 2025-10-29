import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutPayment";

const stripePromise = loadStripe("pk_test_51SHPvrJBdVxn8zqlyY62ZXlyNYJGsjxEDq9NbAbPaqATlEV3xfGTXJJnRVWzWwy1RLyYVMmwnLNkgMOKIvmAvSss001KDl7Uum");

const PaymentPage = ({ amount, userId, addressId, cartItems }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Enhanced validation with specific messages
    if (!amount || amount <= 0) {
      setError("Invalid amount");
      setLoading(false);
      return;
    }

    if (!addressId) {
      setError("Please select a delivery address");
      setLoading(false);
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty");
      setLoading(false);
      return;
    }

    console.log("Creating order with payment intent");
    console.log("Amount:", amount);
    console.log("AddressId:", addressId);
    console.log("CartItems:", cartItems);

    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Please login to continue");
      setLoading(false);
      return;
    }

    const orderRequest = {
      addressId: addressId,
      totalAmount: parseFloat(amount),
      orderDate: new Date().toISOString(),
      discount: 0,
      expectedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "CARD",
      orderItemRequests: cartItems.map(item => ({
        productId: item.productId || item.id,
        productVariantId: item.productVariantId || item.variantId || item.variant?.id,
        quantity: item.quantity || 1,
        itemPrice: item.price || item.itemPrice || 0
      }))
    };

    console.log("Order Request:", orderRequest);

    fetch("http://localhost:8080/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(orderRequest),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Order created successfully:", data);
        
        if (data.credentials && data.credentials.client_secret) {
          setClientSecret(data.credentials.client_secret);
          setOrderId(data.orderId);
          setPaymentIntentId(data.credentials.payment_intent_id);
          setLoading(false);
        } else {
          throw new Error("Payment initialization failed - no client secret received");
        }
      })
      .catch((err) => {
        console.error("Error creating order:", err);
        setError(err.message || "Failed to initialize payment");
        setLoading(false);
      });
  }, [amount, addressId, cartItems]);

  const options = { 
    clientSecret, 
    appearance: { 
      theme: "stripe",
      variables: {
        colorPrimary: '#000000',
      }
    } 
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
        <h3 className="text-red-800 font-semibold mb-2">⚠️ Payment Error</h3>
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white border rounded-lg p-6 mt-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Creating your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {clientSecret ? (
        <div>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-xs">{orderId?.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">₹{parseFloat(amount).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm 
              userId={userId} 
              addressId={addressId} 
              amount={amount}
              orderId={orderId}
              paymentIntentId={paymentIntentId}
            />
          </Elements>
        </div>
      ) : (
        <p className="text-gray-600">Loading payment form...</p>
      )}
    </div>
  );
};

export default PaymentPage;