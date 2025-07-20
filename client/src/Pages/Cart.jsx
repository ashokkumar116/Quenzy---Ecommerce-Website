import { useEffect, useState } from "react";
import { useCart } from "../Contexts/CartContext";
import { asset } from "../assets/asset";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [showAddress, setShowAddress] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();

    const {
        addToCart,
        cart,
        removeFromCart,
        clearCart,
        addQuantity,
        removeQuantity,
    } = useCart();
    console.log(cart);

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalSubAmount, setTotalSubAmount] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const calculateTotal = () => {
        const total = cart.reduce((acc, item) => {
            const offerPrice =
                item.price - (item.price * item.discount_percentage) / 100;
            return acc + offerPrice * item.quantity;
        }, 0);
        setTotalSubAmount(total);
        setTotalTax((total / 100) * 2);
        setTotalAmount(total + totalTax);
    };

    useEffect(() => {
        calculateTotal();
        console.log(cart);
    }, [cart]);

    return (
        <div className="py-35 bg-base-300">
            <div className="flex flex-col md:flex-row max-w-6xl w-full px-6 mx-auto bg-base-100 px-5 py-5 rounded-lg ">
            <div className="flex-1 max-w-4xl">
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart{" "}
                    <span className="text-sm text-primary">
                        {cart.length} items
                    </span>
                </h1>

                {cart.length > 0 && (
                    <>
                        <div className="grid grid-cols-[2fr_1fr_1fr] text-base-content/70 text-base font-medium pb-3">
                            <p className="text-left">Product Details</p>
                            <p className="text-center">Subtotal</p>
                            <p className="text-center">Action</p>
                        </div>

                        {cart.map((item, index) => {
                            const offerPrice =
                                item.price -
                                (item.price * item.discount_percentage) / 100;
                            return (
                                <div
                                    key={index}
                                    className="grid grid-cols-[2fr_1fr_1fr] text-base-content/50 items-center text-sm md:text-base font-medium pt-3"
                                >
                                    <div className="flex items-center md:gap-6 gap-3">
                                        <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-primary/50 rounded overflow-hidden">
                                            <img
                                                className="max-w-full h-full object-cover"
                                                src={`${asset.imageBaseUrl}${
                                                    Array.isArray(item.images)
                                                      ? item.images?.[0]?.image_url
                                                      : item.image_url || ""
                                                  }`}
                                                  
                                            />
                                        </div>
                                        <div>
                                            <p className="hidden md:block font-semibold">
                                                {item.name}
                                            </p>
                                            <div className="font-normal text-primary">
                                                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-base-100 border border-primary rounded select-none">
                                                    <button
                                                        onClick={() =>
                                                            removeQuantity(
                                                                item.id
                                                            )
                                                        }
                                                        className="cursor-pointer text-md px-2 h-full"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-5 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            addQuantity(item.id)
                                                        }
                                                        className="cursor-pointer text-md px-2 h-full"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-center">
                                        ₹{" "}
                                        {(offerPrice * item.quantity).toFixed(
                                            2
                                        )}
                                    </p>
                                    <button
                                        className="cursor-pointer mx-auto"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                                                className="stroke-error"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}

                        <div className="flex justify-between pr-5">
                            <button
                                className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
                                onClick={() => navigate("/")}
                            >
                                <svg
                                    width="15"
                                    height="11"
                                    viewBox="0 0 15 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                                        className="stroke-primary"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Continue Shopping
                            </button>
                            <button
                                className="group cursor-pointer flex items-center mt-8 gap-2 text-error font-medium"
                                onClick={() => clearCart()}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </>
                )}

                {cart.length === 0 && (
                    <>
                        <div className="text-center text-base-content/50 italic">
                            No Products Added in Cart
                        </div>
                        <button
                            className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
                            onClick={() => navigate("/")}
                        >
                            <svg
                                width="15"
                                height="11"
                                viewBox="0 0 15 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                                    className="stroke-primary"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Continue Shopping
                        </button>
                    </>
                )}
            </div>

            <div className="max-w-[360px] w-full bg-base-300 p-5 max-md:mt-16 border border-primary/50 flex flex-col justify-end">
                <h2 className="text-xl md:text-xl font-medium">
                    Order Summary
                </h2>

                <hr className="border-primary/50" />

                <div className="text-base-content/50 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span>
                        <span>₹ {totalSubAmount.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span>
                        <span>₹ {totalTax.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span>
                        <span>₹ {totalAmount.toFixed(2)}</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 cursor-pointer bg-primary/80 text-base-content font-medium hover:bg-primary/70 transition">
                    Place Order
                </button>
            </div>
        </div>
        </div>
    );
};

export default Cart;
