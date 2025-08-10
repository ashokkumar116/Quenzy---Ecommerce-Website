import React, { useContext, useEffect, useState } from "react";
import { useOrders } from "../Contexts/OrdersContext";
import { AuthContext } from "../Contexts/AuthContext";
import QuenzyLoader from "../Loader/QuenzyLoader";
import { asset } from "../assets/asset";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "../axios";
import OrderSuccess from "../Components/OrderSuccess";
import { useCart } from "../Contexts/CartContext";

const OrderSummary = () => {
  const { orderProducts } = useOrders();
  const { user, loading } = useContext(AuthContext);
  const { cart, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [address, setAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [totals, setTotals] = useState({
    totalUnitPrice: 0,
    savings: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const initialQuantities = {};
    orderProducts.forEach((product) => {
      initialQuantities[product.id] = product.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [orderProducts]);

  useEffect(() => {
    let totalUnitPrice = 0;
    let totalDiscount = 0;
    let subtotal = 0;
    let taxRate = 2;
    let shipping = 0;

    orderProducts.forEach((product) => {
      const qty = quantities[product.id] || 1;
      const price = product.price;
      const discountPercentage = product.discount_percentage || 0;

      const originalTotal = price * qty;
      const discountAmount = originalTotal * (discountPercentage / 100);
      const discountedTotal = originalTotal - discountAmount;

      totalUnitPrice += originalTotal;
      totalDiscount += discountAmount;
      subtotal += discountedTotal;
    });

    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax + shipping;

    setTotals({
      totalUnitPrice,
      savings: totalDiscount,
      subtotal,
      tax,
      shipping,
      total,
    });
  }, [quantities, orderProducts]);

  const handlePlaceOrder = async () => {
    if (!address) {
      toast.error("Address Required");
      return;
    }
    const payload = {
      address,
      paymentMethod: "COD",
      items: orderProducts.map((p) => ({
        productId: p.id,
        quantity: quantities[p.id],
        price:
          (p.price - (p.price * (p.discount_percentage || 0)) / 100) *
          quantities[p.id],
      })),
      total: totals.total,
    };

    try {
      const res = await axios.post("/orders/placeorder", payload);
      toast.success("Order Placed! ID: " + res.data.orderUUID);
      setShowSuccess(true);
      orderProducts.forEach((p) => {
        removeFromCart(p.id);
      });
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  if (loading) return <QuenzyLoader />;

  return (
    <div className="py-20 bg-base-300">
      {/* Info Banner */}
      <div className="w-full py-2.5 px-3 font-medium text-xs sm:text-sm text-primary-content text-center bg-primary fixed top-20 z-30">
        ⚠️ Only Cash on Delivery is available for now. 💳 Online payment will be available soon.
      </div>

      <div className="flex flex-col gap-5 px-4 sm:px-8 md:px-10 pt-24">
        <h1 className="text-xl sm:text-2xl font-bold mb-3">Order Summary</h1>

        {/* Customer Info Form */}
        <div className="bg-base-100 p-4 sm:p-5 rounded-lg shadow-lg">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label>
              Name:
              <input
                type="text"
                value={user.name}
                disabled
                className="input input-primary w-full mt-1"
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={user.email}
                disabled
                className="input input-primary w-full mt-1"
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                value={user.contact}
                disabled
                className="input input-primary w-full mt-1"
              />
            </label>
            <label className="md:col-span-3">
              Address:
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                required
                className="textarea textarea-primary w-full mt-1 h-20"
              />
            </label>
          </form>
        </div>

        {/* Product List */}
        <div className="grid gap-4 bg-base-100 p-4 sm:p-5 rounded-lg shadow-lg">
          {orderProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-center sm:items-stretch sm:justify-between gap-4"
            >
              <img
                src={`${asset.imageBaseUrl}${
                  product.images ? product.images[0].image_url : product.image_url
                }`}
                alt={product.name}
                className="h-28 w-28 object-cover rounded"
              />

              <h1 className="flex-1 text-center sm:text-left">{product.name}</h1>

              {/* Quantity Controls */}
              <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [product.id]: Math.max(1, (prev[product.id] || 1) - 1),
                    }))
                  }
                  disabled={quantities[product.id] <= 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  -
                </button>
                <span>{Math.min(quantities[product.id], product.stock)}</span>
                <button
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [product.id]: Math.min(
                        product.stock,
                        (prev[product.id] || 1) + 1
                      ),
                    }))
                  }
                  disabled={quantities[product.id] >= product.stock}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  +
                </button>
              </div>

              {/* Price */}
              <div className="text-center sm:text-right font-semibold">
                ₹ {(product.price * quantities[product.id]).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Order Totals */}
        <div className="bg-base-100 p-4 sm:p-5 rounded-lg shadow-lg">
          <h1 className="text-lg sm:text-xl font-semibold mb-3">Order Summary</h1>
          <div className="flex justify-between text-sm sm:text-base">
            <p>Total Unit Price:</p>
            <p>₹ {totals.totalUnitPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <p>Discount:</p>
            <p className="text-green-600">- ₹ {totals.savings.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <p>Subtotal:</p>
            <p>₹ {totals.subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <p>Tax (2%):</p>
            <p>₹ {totals.tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <p>Shipping:</p>
            <p>₹ {totals.shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold text-lg mt-3">
            <p>Total:</p>
            <p>₹ {totals.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full bg-base-300 mt-5 px-4 sm:px-8 md:px-10">
        <div className="p-4 sm:p-5 bg-base-100 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg shadow-lg">
          <button
            className="btn btn-outline w-full"
            onClick={() => navigate("/")}
          >
            Return to Shopping
          </button>
          <button
            className="btn btn-success w-full"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Order Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/90 z-[200]">
          <OrderSuccess />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default OrderSummary;
