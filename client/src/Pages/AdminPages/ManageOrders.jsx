import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast, ToastContainer } from "react-toastify";
import { asset } from "../../assets/asset";
import MiniQuenzyLoader from "../../Loader/MiniQuenzyLoader";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const statusOptions = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders/getallorders");
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (order_id, newStatus) => {
    try {
      await axios.put("/orders/updateorderstatus", {
        order_id:order_id,
        status: newStatus,
      });
      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="pt-20 text-center text-xl"><MiniQuenzyLoader/></div>;

  return (
    <div className="pt-20 px-6 pb-10 bg-base-300 min-h-screen">
      <h1 className="text-3xl text-primary uppercase font-bold mb-6">Manage Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.order_id}
            className="mb-6 p-6 bg-base-100 rounded-xl shadow-lg border border-base-300"
          >
            {/* Header: Basic Order Info */}
            <div className="flex flex-col md:flex-row md:justify-between gap-3">
              <div className="text-sm">
                <p><span className="font-semibold">Order ID:</span> {order.order_uuid}</p>
                <p><span className="font-semibold">User:</span> {order.user_name} ({order.user_email})</p>
                <p><span className="font-semibold">Address:</span> {order.shipping_address}</p>
                <p><span className="font-semibold">Date:</span> {new Date(order.created_at).toLocaleString()}</p>
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col items-start md:items-end">
                <p className="font-semibold mb-1">Status:</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status.toUpperCase()}
                </span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                  className="select select-sm select-bordered w-40"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="mt-4">
              <p className="font-semibold mb-2 text-sm">Products:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-base-300 rounded-lg"
                  >
                    <img
                      src={`${asset.imageBaseUrl}${item.image_url}`}
                      alt={item.product_name}
                      className="w-14 h-14 rounded object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-semibold">{item.product_name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>₹ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-right font-bold text-lg">
              Total: ₹ {order.total_price}
            </div>
          </div>
        ))
      )}

      <ToastContainer />
    </div>
  );
};

export default ManageOrders;
