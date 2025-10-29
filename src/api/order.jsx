// api/order.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const confirmPaymentAPI = async (paymentData) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.post(
      `${API_BASE_URL}/order/update-payment`,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Payment confirmation error:", error);
    throw error;
  }
};

export const placeOrderAPI = async (orderData) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.post(
      `${API_BASE_URL}/order`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Order placement error:", error);
    throw error;
  }
};