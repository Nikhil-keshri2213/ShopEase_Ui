import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/features/cart";
import { clearCart } from "../../store/actions/cartAction";
import { fetchUserDetails } from "../../api/userInfo";
import { setLoading } from "../../store/features/common";
import { useNavigate } from "react-router-dom";
import PaymentPage from "../PaymentPage/PaymentPage";
import Modal from "react-modal";
import { placeOrderAPI } from "../../api/order";

Modal.setAppElement("#root");

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isCODModalOpen, setIsCODModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);

  // Generate delivery dates (7 days from now and 10 days from now)
  const deliveryDates = useMemo(() => {
    const date1 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const date2 = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    return [
      {
        label: date1.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: date1.toISOString(),
      },
      {
        label: date2.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: date2.toISOString(),
      },
    ];
  }, []);

  // Subtotal calculation
  const subTotal = useMemo(() => {
    let value = 0;
    cartItems?.forEach((element) => {
      value += element?.subTotal || (element?.price || 0) * (element?.quantity || 0);
    });
    return parseFloat(value?.toFixed(2));
  }, [cartItems]);

  // Fetch user info
  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => {
        setUserInfo(res);
        // Auto-select first address
        if (res?.addressList?.length > 0) {
          setSelectedAddress(res.addressList[0]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  // Auto-select first delivery date
  useEffect(() => {
    if (deliveryDates.length > 0 && !selectedDeliveryDate) {
      setSelectedDeliveryDate(deliveryDates[0].value);
    }
  }, [deliveryDates, selectedDeliveryDate]);

  // Debug cart items
  useEffect(() => {
    console.log("=== CHECKOUT DEBUG ===");
    console.log("Cart Items:", cartItems);
    console.log("Cart Items Length:", cartItems?.length);
    console.log("SubTotal:", subTotal);
    console.log("Selected Address:", selectedAddress);
    console.log("Selected Delivery Date:", selectedDeliveryDate);
    console.log("Payment Method:", paymentMethod);
  }, [cartItems, subTotal, selectedAddress, selectedDeliveryDate, paymentMethod]);

  // Validate before proceeding
  const canProceed = useMemo(() => {
    return (
      cartItems?.length > 0 &&
      selectedAddress &&
      selectedDeliveryDate &&
      paymentMethod &&
      subTotal > 0
    );
  }, [cartItems, selectedAddress, selectedDeliveryDate, paymentMethod, subTotal]);

  // Handle COD Order
  const handleConfirmCOD = async () => {
    if (!canProceed) {
      alert("Please select address, delivery date, and payment method");
      return;
    }

    try {
      dispatch(setLoading(true));

      const orderData = {
        addressId: selectedAddress.id,
        paymentMethod: "COD",
        totalAmount: subTotal,
        discount: 0,
        orderDate: new Date().toISOString(),
        expectedDeliveryDate: selectedDeliveryDate,
        orderItemRequests: cartItems.map((item) => ({
          productId: item?.productId || item?.id,
          productVariantId: item?.productVariantId || item?.variantId || item?.variant?.id,
          quantity: item?.quantity,
          itemPrice: item?.price || item?.itemPrice,
        })),
      };

      console.log("Sending COD Order Data:", orderData);
      const response = await placeOrderAPI(orderData);
      console.log("Order API Response:", response);

      // Clear cart after successful order
      dispatch(clearCart());
      setIsCODModalOpen(false);

      // Navigate to success page
      navigate("/order-success", {
        state: {
          orderId: response?.orderId || response?.id,
          amount: subTotal,
          paymentMethod: "COD",
        },
      });
    } catch (err) {
      console.error("Order placement failed:", err);
      alert(err.response?.data?.error || "Failed to place order. Try again!");
    } finally {
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
              <div className="space-y-4">
                {userInfo.addressList.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedAddress?.id === address.id
                        ? "border-black bg-gray-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress?.id === address.id}
                        onChange={() => setSelectedAddress(address)}
                        className="mt-1"
                      />
                      <div className="text-gray-700">
                        <p className="font-medium">
                          {userInfo?.firstName} {userInfo?.lastName}
                        </p>
                        <p>{address?.name}</p>
                        <p>{address?.street}</p>
                        <p>
                          {address?.city}, {address?.state}, {address?.country},{" "}
                          {address?.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 mb-4">No address available</p>
                <button
                  onClick={() => navigate("/account-details/addresses")}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Add Address
                </button>
              </div>
            )}
          </div>

          {/* Delivery Day */}
          <div className="p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Choose Delivery Date</h2>
            <p className="text-gray-600 mb-4">Select a day:</p>
            <div className="flex gap-4">
              {deliveryDates.map((date, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedDeliveryDate(date.value)}
                  className={`w-[90px] h-[50px] flex items-center justify-center border rounded-lg cursor-pointer
                  hover:scale-105 transition-all font-medium ${
                    selectedDeliveryDate === date.value
                      ? "bg-black text-white border-black"
                      : "bg-gray-50 border-gray-400 text-gray-700"
                  }`}
                >
                  {date.label}
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
                  checked={paymentMethod === "CARD"}
                  onChange={() => setPaymentMethod("CARD")}
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {/* Validation Message */}
            {!canProceed && paymentMethod && (
              <p className="mt-4 text-sm text-red-600">
                {!cartItems?.length && "Your cart is empty. "}
                {!selectedAddress && "Please select an address. "}
                {!selectedDeliveryDate && "Please select a delivery date. "}
                {subTotal <= 0 && "Invalid cart amount."}
              </p>
            )}

            {/* Conditional Render - FIXED: Added cartItems prop */}
            <div className="mt-6">
              {paymentMethod === "CARD" && canProceed ? (
                <>
                  {console.log("Passing to PaymentPage:", {
                    amount: subTotal,
                    userId: userInfo?.id,
                    addressId: selectedAddress?.id,
                    cartItems: cartItems,
                    cartItemsLength: cartItems?.length
                  })}
                  <PaymentPage
                    amount={subTotal}
                    userId={userInfo?.id}
                    addressId={selectedAddress?.id}
                    cartItems={cartItems} // ✅ FIXED: Added cartItems prop
                  />
                </>
              ) : paymentMethod === "COD" && canProceed ? (
                <button
                  className="w-[150px] h-[48px] bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={() => setIsCODModalOpen(true)}
                  disabled={!canProceed}
                >
                  Order Now
                </button>
              ) : paymentMethod && !canProceed ? (
                <button
                  className="w-[150px] h-[48px] bg-gray-400 text-white rounded-lg cursor-not-allowed"
                  disabled
                >
                  Select Details
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full h-fit lg:w-[30%] border rounded-2xl shadow-md bg-white p-6 flex flex-col gap-4 sticky top-8">
          <h2 className="text-lg font-bold">Order Summary</h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Items ({cartItems?.length || 0})</span>
              <span className="font-medium">₹ {subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium">₹ 0.00</span>
            </div>
          </div>

          <hr className="h-[1px] bg-gray-300" />
          
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span>₹ {subTotal.toFixed(2)}</span>
          </div>

          {/* Order Details Summary */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Payment:</span>
              <span className="font-medium">
                {paymentMethod || "Not selected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery:</span>
              <span className="font-medium">
                {selectedDeliveryDate
                  ? new Date(selectedDeliveryDate).toLocaleDateString()
                  : "Not selected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-medium">
                {selectedAddress ? "Selected" : "Not selected"}
              </span>
            </div>
          </div>

          {/* Cart Items Preview */}
          {cartItems?.length > 0 && (
            <div className="mt-4 max-h-40 overflow-y-auto">
              <p className="text-sm font-semibold mb-2">Items in Cart:</p>
              {cartItems.map((item, idx) => (
                <div key={idx} className="text-xs text-gray-600 flex justify-between py-1">
                  <span className="truncate">{item?.name || item?.productName || "Product"}</span>
                  <span>x{item?.quantity}</span>
                </div>
              ))}
            </div>
          )}

          <button
            className="w-full items-center h-[48px] bg-gray-200 border rounded-lg mt-2 text-gray-800 hover:bg-gray-300 transition"
            onClick={() => navigate("/cart-items")}
          >
            Edit Cart
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

        <div className="mb-6 space-y-3">
          <p className="text-gray-600">
            Do you want to place this order with Cash on Delivery?
          </p>
          
          <div className="p-4 bg-gray-50 rounded-lg text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-bold">₹ {subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">Cash on Delivery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Date:</span>
              <span className="font-medium">
                {selectedDeliveryDate && new Date(selectedDeliveryDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Items:</span>
              <span className="font-medium">{cartItems?.length} items</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsCODModalOpen(false)}
            className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmCOD}
            className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          >
            Confirm Order
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;