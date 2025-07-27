// Pages/OrderSuccess.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center text-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: "spring", stiffness: 150 }}
                >
                    <CheckCircle className="text-green-500" size={72} />
                </motion.div>

                <h2 className="text-2xl font-bold mb-2 text-green-700">
                    Order Placed Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                    Thank you for shopping with <span className="font-semibold text-green-700">Quenzy</span>. Your order has been confirmed. You will receive an email with your order details shortly.
                </p>

                <div className="flex flex-col gap-3">
                    <Link to="/" className="btn btn-outline btn-success w-full">
                        Continue Shopping
                    </Link>
                    <Link to="/my-orders" className="btn btn-success w-full">
                        View My Orders
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default OrderSuccess;
