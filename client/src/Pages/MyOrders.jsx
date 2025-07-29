import React, { useEffect, useState } from "react";
import axios from "../axios";
import { asset } from "../assets/asset";
import { toast, ToastContainer } from "react-toastify";

const formatDate = (isoDateStr) => {
    const date = new Date(isoDateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return `${date.getDate().toString().padStart(2, "0")} ${date.toLocaleString(
        "default",
        {
            month: "short",
        }
    )} ${date.getFullYear()}`;
};

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [showCancel, setShowCancel] = useState(false);
    const [cancelId, setCancelId] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewProduct, setReviewProduct] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const checkIfReviewed = async (orderId, productId) => {
        try {
            const res = await axios.get(`/reviews/check`, {
                params: { orderId, productId },
            });
            return res.data.exists;
        } catch (err) {
            console.error("Error checking review", err);
            return false;
        }
    };

    const handleOpenReview = (product, order_id) => {
        setReviewProduct({ ...product, order_id });
        setShowReviewModal(true);
    };

    const handleSubmitReview = async () => {
        try {
            await axios.post("/reviews/add-review", {
                productId: reviewProduct.product_id,
                orderId: reviewProduct.order_id,
                rating,
                comment,
            });
            toast.success("Review submitted!");
            fetchMyOrders();
            setShowReviewModal(false);
            setReviewProduct(null);
            setRating(5);
            setComment("");
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit review.");
        }
    };

    const fetchMyOrders = async () => {
        try {
            const res = await axios.get("/orders/getmyorders");
            setOrders(res.data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const handleCancelBase = (order_id) => {
        setCancelId(order_id);
        setShowCancel(true);
    };

    const handleCancelOrder = async (e) => {
        e.preventDefault();
        const response = await axios.put("/orders/cancelorder", {
            order_id: cancelId,
        });
        if (response.status === 200) {
            setCancelId(null);
            setShowCancel(false);
            toast.success("Canceled Order Successfully");
            fetchMyOrders();
        }
    };

    return (
        <div className="min-h-screen bg-base-300 py-10 px-4 md:px-12 py-25">
            <h1 className="text-3xl font-bold mb-8 text-center text-primary">
                My Orders
            </h1>

            {orders.length === 0 ? (
                <div className="text-center text-base-content/80">
                    No orders placed yet.
                </div>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.order_id}
                        className="bg-base-100 rounded-2xl p-6 mb-8 shadow-md hover:shadow-xl transition duration-300"
                    >
                        <div className="mb-5">
                            <div className="flex flex-wrap justify-between text-sm text-base-content/80 mb-2">
                                <span>
                                    <span className="font-medium text-base-content/80">
                                        Order ID:
                                    </span>{" "}
                                    #{order.order_id}
                                </span>
                                <span>{formatDate(order.created_at)}</span>
                            </div>
                            <div className="flex flex-wrap justify-between text-sm text-base-content/80 mb-2">
                                <span className="truncate max-w-[70%]">
                                    <span className="font-medium text-base-content/80">
                                        Order UUID:
                                    </span>{" "}
                                    {order.order_uuid}
                                </span>
                                <span>
                                    <span className="font-medium">
                                        Shipping:
                                    </span>{" "}
                                    {order.shipping_address}
                                </span>
                            </div>
                            <div className="flex flex-wrap justify-between text-sm text-base-content/80">
                                <span>
                                    Payment:{" "}
                                    <span className="uppercase">
                                        {order.payment_method}
                                    </span>
                                </span>
                                <span>
                                    Status:{" "}
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold uppercase
                                                        ${
                                                            order.status ===
                                                            "pending"
                                                                ? "bg-yellow-200 text-yellow-900"
                                                                : order.status ===
                                                                  "confirmed"
                                                                ? "bg-blue-200 text-blue-900"
                                                                : order.status ===
                                                                  "shipped"
                                                                ? "bg-purple-200 text-purple-900"
                                                                : order.status ===
                                                                  "delivered"
                                                                ? "bg-green-200 text-green-900"
                                                                : order.status ===
                                                                  "cancelled"
                                                                ? "bg-red-200 text-red-900"
                                                                : "bg-base-200 text-base-content"
                                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </span>
                            </div>
                            <p className="text-md font-semibold text-primary mt-3">
                                Total: ₹{order.total_price}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 items-center rounded-xl p-3 hover:bg-base-200 transition"
                                >
                                    <img
                                        src={`${asset.imageBaseUrl}${item.image_url}`}
                                        alt={item.product_name}
                                        className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-md font-semibold text-base-content/80">
                                            {item.product_name}
                                        </h2>
                                        <p className="text-sm text-base-content/80">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-md font-bold text-base-content/80">
                                        ₹{item.price}
                                    </p>
                                    {order.status === "delivered" &&
                                        (item.reviewed ? (
                                            <span className="text-green-600 font-medium text-sm">
                                                Review Added
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleOpenReview(
                                                        item,
                                                        order.order_id
                                                    )
                                                }
                                                className="btn btn-sm btn-primary mt-2"
                                            >
                                                Add Review
                                            </button>
                                        ))}
                                </div>
                            ))}
                        </div>
                        {order.status !== "delivered" && order.status !== "shipped" &&
                            order.status !== "cancelled" && (
                                <button
                                    className="btn btn-error"
                                    onClick={() =>
                                        handleCancelBase(order.order_id)
                                    }
                                >
                                    Cancel Order
                                </button>
                            )}
                    </div>
                ))
            )}
            {showCancel && (
                <div className="fixed top-0 flex justify-center items-center bg-[rgba(0,0,0,0.9)] w-full z-200 h-full left-0">
                    <div className="flex flex-col items-center bg-base-100 shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-base-content">
                        <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
                                    stroke="#DC2626"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <h2 className="text-base-content font-semibold mt-4 text-xl">
                            Are you sure?
                        </h2>
                        <p className="text-sm text-base-content/60 mt-2 text-center">
                            Do you really want to cancel this order? This action
                            <br />
                            cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-5 w-full">
                            <button
                                onClick={() => setShowCancel(false)}
                                type="button"
                                className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-base-100 text-base-content/80 font-medium text-sm hover:bg-base-200 cursor-pointer active:scale-95 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCancelOrder}
                                type="button"
                                className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition cursor-pointer"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showReviewModal && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                    <div className="bg-base-100 p-6 rounded-xl w-[90%] max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-primary">
                            Review {reviewProduct?.product_name}
                        </h2>

                        <label className="block mb-2">Rating (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="input input-bordered w-full mb-4"
                        />

                        <label className="block mb-2">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            rows="4"
                        />

                        <div className="flex justify-end mt-4 gap-3">
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default MyOrders;
