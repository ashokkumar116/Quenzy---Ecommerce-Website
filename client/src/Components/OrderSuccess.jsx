// Pages/OrderSuccess.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center w-full max-w-sm sm:max-w-md"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {/* Icon */}
                <motion.div
                    className="flex justify-center mb-4 sm:mb-6"
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: "spring", stiffness: 150 }}
                >
                    <CheckCircle
                        className="text-green-500"
                        size={56} // smaller for mobile
                    />
                </motion.div>

                {/* Heading */}
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-green-700">
                    Order Placed Successfully!
                </h2>

                {/* Message */}
                <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
                    Thank you for shopping with{" "}
                    <span className="font-semibold text-green-700">Quenzy</span>.
                    Your order has been confirmed. You will receive an email with
                    your order details shortly.
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-2 sm:gap-3">
                    <Link
                        to="/"
                        className="btn btn-outline btn-success w-full text-sm sm:text-base"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        to="/my-orders"
                        className="btn btn-success w-full text-sm sm:text-base"
                    >
                        View My Orders
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default OrderSuccess;
