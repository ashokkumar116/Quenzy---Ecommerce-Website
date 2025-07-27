import React, { useContext, useEffect, useState } from "react";
import { useOrders } from "../Contexts/OrdersContext";
import { AuthContext } from "../Contexts/AuthContext";
import QuenzyLoader from "../Loader/QuenzyLoader";
import { asset } from "../assets/asset";

const OrderSummary = () => {
    const { orderProducts } = useOrders();
    const { user, loading } = useContext(AuthContext);
    const [quantities, setQuantities] = useState({});
    const [address, setAddress] = useState("");

    useEffect(() => {
        const initialQuantities = {};
        orderProducts.forEach((product) => {
            initialQuantities[product.id] = product.quantity || 1;
        });
        setQuantities(initialQuantities);
    }, [orderProducts]);

    if (loading) {
        return <QuenzyLoader />;
    }

    useEffect(() => {
        console.log(orderProducts);
    }, []);

    const [totals, setTotals] = useState({
        totalUnitPrice: 0,
        savings: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
    });

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

    return (
        <div className="py-25 px-10 bg-base-300">
            <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold mb-3">Order Summary</h1>
                <div className="formfororder bg-base-100 p-5 rounded-lg shadow-lg">
                    <form className="grid grid-cols-2 gap-5">
                        <label htmlFor="username">
                            Name :
                            <input
                                type="text"
                                value={user.name}
                                name="name"
                                id="username"
                                className="input input-primary"
                                disabled
                            />
                        </label>
                        <label htmlFor="email">
                            Email :
                            <input
                                type="text"
                                value={user.email}
                                name="name"
                                id="email"
                                className="input input-primary"
                                disabled
                            />
                        </label>
                        <label htmlFor="address" className="">
                            Address :
                            <textarea
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                name="name"
                                id="username"
                                className="input input-primary w-full mt-2"
                            />
                        </label>
                    </form>
                </div>
                <div className="grid gap-6 bg-base-100 p-5 rounded-lg shadow-lg">
                    {orderProducts.map((product) => {
                        // const [quantity,setQuantity] = useState(()=>{
                        //     return product.quantity ? product.quantity : 1
                        // });
                        return (
                            <div>
                                <div className="grid grid-cols-4 place-items-center">
                                    <img
                                        src={`${asset.imageBaseUrl}${
                                            product.images
                                                ? product.images[0].image_url
                                                : product.image_url
                                        }`}
                                        alt=""
                                        className="h-30"
                                    />
                                    <h1>{product.name}</h1>
                                    <div className="font-normal text-primary">
                                        <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-base-100 border border-primary rounded select-none">
                                            <button
                                                onClick={() =>
                                                    setQuantities((prev) => ({
                                                        ...prev,
                                                        [product.id]: Math.max(
                                                            1,
                                                            (prev[product.id] ||
                                                                1) - 1
                                                        ),
                                                    }))
                                                }
                                            >
                                                -
                                            </button>
                                            {quantities[product.id]}
                                            <button
                                                onClick={() =>
                                                    setQuantities((prev) => ({
                                                        ...prev,
                                                        [product.id]:
                                                            (prev[product.id] ||
                                                                1) + 1,
                                                    }))
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <p>
                                            ₹{" "}
                                            {(
                                                product.price *
                                                quantities[product.id]
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="bg-base-100 p-5 rounded-lg shadow-lg">
                    <h1 className="text-xl font-semibold mb-3">
                        Order Summary
                    </h1>

                    <div className="flex justify-between">
                        <p>Total Unit Price:</p>
                        <p>₹ {totals.totalUnitPrice.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between">
                        <p>Discount:</p>
                        <p className="text-green-600">
                            - ₹ {totals.savings.toFixed(2)}
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <p>Subtotal:</p>
                        <p>₹ {totals.subtotal.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between">
                        <p>Tax (2%):</p>
                        <p>₹ {totals.tax.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between">
                        <p>Shipping:</p>
                        <p>₹ {totals.shipping.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between font-bold text-lg mt-3">
                        <p>Total:</p>
                        <p>₹ {totals.total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
