import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import { cancelOrderAPI, fetchOrderAPI } from "../../api/userInfo";
import {cancelOrder,loadOrders,selectAllOrders,} from "../../store/features/user";
import moment from "moment";
import Timeline from "../../components/Timeline/Timeline";
import { getStepCount } from "../../utils/order-util";

const Orders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const [selectedFilter, setSelectedFilter] = useState("ACTIVE");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");

  useEffect(() => {
    dispatch(setLoading(true));
    fetchOrderAPI()
      .then((res) => {
        dispatch(loadOrders(res));
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    const displayOrders = allOrders?.map((order) => ({
      id: order?.id,
      orderDate: order?.orderDate,
      orderStatus: order?.orderStatus,
      status:
        order?.orderStatus === "PENDING" ||
        order?.orderStatus === "IN_PROGRESS" ||
        order?.orderStatus === "SHIPPED"
          ? "ACTIVE"
          : order?.orderStatus === "DELIVERED"
          ? "COMPLETED"
          : order?.orderStatus,
      items: order?.orderItemList?.map((orderItem) => ({
        id: orderItem?.id,
        brand: orderItem?.product?.brand,
        name: orderItem?.product?.name,
        price: orderItem?.product?.price,
        quantity: orderItem?.quantity,
        url: orderItem?.product?.resources?.[0]?.url,
      })),
      totalAmount: order?.totalAmount,
      paymentMethod: order?.paymentMethod || "N/A",
    }));
    setOrders(displayOrders);
  }, [allOrders]);

  console.log(orders)

  const handleOnChange = useCallback((evt) => {
    setSelectedFilter(evt?.target?.value);
  }, []);

  const onCancelOrder = useCallback(
    (id) => {
      dispatch(setLoading(true));
      cancelOrderAPI(id)
        .then(() => {
          dispatch(cancelOrder(id));
        })
        .catch(() => {})
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch]
  );

  const filteredOrders = orders?.filter(
    (order) => order?.status === selectedFilter
  );

  return (
    <div className="p-6">
      {orders?.length > 0 ? (
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">My Orders</h1>
            <select
              className="border border-gray-600 rounded-lg p-2 text-sm focus:outline-none"
              value={selectedFilter}
              onChange={handleOnChange}
            >
              <option value="ACTIVE">Active</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {filteredOrders?.length === 0 ? (
            <p className="text-gray-500">
              No {selectedFilter.charAt(0) + selectedFilter.slice(1).toLowerCase()} Orders
            </p>
          ) : (
            filteredOrders?.map((order, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl shadow-sm p-4 mb-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-gray-800">
                      Order ID: #{order?.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order?.items?.length > 1
                        ? `${order?.items?.length} Products`
                        : order?.items?.[0]?.name || "Order"}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setSelectedOrder((prev) =>
                        prev === order?.id ? null : order?.id
                      )
                    }
                    className="text-blue-700 text-sm underline hover:text-blue-900"
                  >
                    {selectedOrder === order?.id ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {selectedOrder === order?.id && (
                  <div className="mt-4 border-t pt-4">
                    <div className="flex flex-col gap-1 text-sm text-gray-500">
                      <p>
                        Order Date: {moment(order?.orderDate).format("MMMM DD, YYYY")}
                      </p>
                      <p>
                        Expected Delivery:{" "}
                        {moment(order?.orderDate).add(3, "days").format("MMMM DD, YYYY")}
                      </p>
                     
                      <p>Payment Method: {order?.paymentMethod}</p>
                      {}
                    </div>

                    {order?.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 items-center mb-3 bg-gray-50 rounded-lg p-2"
                      >
                        <img
                          src={item?.url}
                          alt={item?.name}
                          className="w-[90px] h-[90px] object-cover rounded-md border"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{item?.brand}</p>
                          <p className="font-medium text-gray-800">{item?.name}</p>
                          <p className="text-gray-600 text-sm">
                            Quantity: {item?.quantity}
                          </p>
                          <p className="text-gray-800 font-semibold text-sm">
                            Price: Rs.{item?.price}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between items-center mt-2">
                      <p className="font-semibold">Total: Rs.{order?.totalAmount}</p>
                      {order?.orderStatus !== "CANCELLED" &&
                        getStepCount[order?.orderStatus] <= 2 && (
                          <button
                            onClick={() => onCancelOrder(order?.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                          >
                            Cancel Order
                          </button>
                        )}
                    </div>

                    {order?.status === "ACTIVE" && (
                      <div className="mt-4">
                        <Timeline stepCount={getStepCount[order?.orderStatus]} />
                      </div>
                    )}
                    {order?.status === "CANCELLED" && (
                      <div className="mt-4">
                        <p className="text-red-700">{order?.status}</p>
                      </div>
                    )}
                    {order?.status === "COMPLETED" && (
                      <div className="mt-4">
                        <p className="text-green-700">{order?.status}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
