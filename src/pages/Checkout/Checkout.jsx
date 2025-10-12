import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/features/cart";
import { clearCart } from "../../store/actions/cartAction"; // use your thunk, not reducer
import { fetchUserDetails } from "../../api/userInfo";
import { setLoading } from "../../store/features/common";
import { useNavigate } from "react-router-dom";
import PaymentPage from "../PaymentPage/PaymentPage";
import Modal from "react-modal";
import { placeOrderAPI } from "../../api/order"; // import your order API

Modal.setAppElement("#root");

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isCODModalOpen, setIsCODModalOpen] = useState(false);

  // subtotal
  const subTotal = useMemo(() => {
    let value = 0;
    cartItems?.forEach((element) => {
      value += element?.subTotal || (element?.price || 0) * (element?.quantity || 0);
    });
    return value?.toFixed(2);
  }, [cartItems]);

  // fetch user info
  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => setUserInfo(res))
      .catch((err) => console.error(err))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  const handleConfirmCOD = async () => {
  try {
    dispatch(setLoading(true));

    const orderData = {
      userId: userInfo?.id,
      addressId: userInfo?.addressList?.[0]?.id,
      paymentMethod: "COD",
      totalAmount: subTotal,
      discount: 0, // if any
      orderDate: new Date().toISOString(),
      expectedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      orderItemRequests: cartItems.map((item) => ({
        productId: item?.productId,
        productVariantId: item?.variantId || item?.variant?.id,
        quantity: item?.quantity,
        itemPrice: item?.price,
      })),
    };

    console.log("Sending Order Data:", orderData);
    const response = await placeOrderAPI(orderData);
    console.log("Order API Response:", response);
    dispatch(clearCart());
    setIsCODModalOpen(false);
    navigate("/account-details/orders");
  } 
  catch (err) {
    console.error("Order placement failed:", err);
    alert("Failed to place order. Try again!");
  } 
  finally {
    dispatch(setLoading(false));
  }
};

  return (
    <>
      <div className="p-8 flex flex-col lg:flex-row gap-8">
        {/* Left Side */}
        <div className="w-full lg:w-[70%] flex flex-col gap-8">
          {/* Delivery Address */}
          <div className="p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
            {userInfo?.addressList?.length > 0 ? (
              <div className="text-gray-700">
                <p className="font-medium">
                  {userInfo?.firstName} {userInfo?.lastName}
                </p>
                <p>{userInfo?.addressList?.[0]?.name}</p>
                <p>{userInfo?.addressList?.[0]?.street}</p>
                <p>
                  {userInfo?.addressList?.[0]?.city},{" "}
                  {userInfo?.addressList?.[0]?.state},{" "}
                  {userInfo?.addressList?.[0]?.country},{" "}
                  {userInfo?.addressList?.[0]?.pincode}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No address available</p>
            )}
          </div>

          {/* Delivery Day */}
          <div className="p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Choose Delivery</h2>
            <p className="text-gray-600 mb-4">Select a day:</p>
            <div className="flex gap-4">
              {["Oct 5", "Oct 8"].map((day, idx) => (
                <div
                  key={idx}
                  className="w-[90px] h-[50px] flex items-center justify-center border rounded-lg cursor-pointer
                  hover:scale-105 transition-all bg-gray-50 border-gray-400 text-gray-700 font-medium"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value="CARD"
                  onChange={() => setPaymentMethod("CARD")}
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value="COD"
                  onChange={() => setPaymentMethod("COD")}
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value="UPI"
                  onChange={() => setPaymentMethod("UPI")}
                />
                <span>UPI / Wallet</span>
              </label>
            </div>

            {/* Conditional Render */}
            <div className="mt-6">
              {paymentMethod === "CARD" ? (
                <PaymentPage
                  amount={subTotal}
                  userId={userInfo?.id}
                  addressId={userInfo?.addressList?.[0]?.id}
                />
              ) : paymentMethod === "COD" ? (
                <button
                  className="w-[150px] h-[48px] bg-black text-white rounded-lg hover:bg-gray-800 transition"
                  onClick={() => setIsCODModalOpen(true)}
                >
                  Order Now
                </button>
              ) : paymentMethod === "UPI" ? (
                <button
                  className="w-[150px] h-[48px] bg-black text-white rounded-lg hover:bg-gray-800 transition"
                  onClick={() => navigate("/payment")}
                >
                  Pay Now
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full h-fit lg:w-[30%] border rounded-2xl shadow-md bg-white p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <p>Items Count: {cartItems?.length}</p>
          <p>Subtotal Amount: ₹ {subTotal}</p>
          <p>Shipping Charges: FREE</p>
          <hr className="h-[1px] bg-gray-300" />
          <p className="text-lg font-bold">Total Amount: ₹ {subTotal}</p>

          <button
            className="w-full items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800"
            onClick={() => navigate("/cart-items")}
          >
            Edit Order
          </button>
        </div>
      </div>

      {/* COD Confirmation Modal */}
      <Modal
        isOpen={isCODModalOpen}
        onRequestClose={() => setIsCODModalOpen(false)}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px] mx-auto mt-40 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Order</h2>

        <p className="mb-6 text-gray-600">
          Do you want to place this order with Cash on Delivery?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsCODModalOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmCOD}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;
