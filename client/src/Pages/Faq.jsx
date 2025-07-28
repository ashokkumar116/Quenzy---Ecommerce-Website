import { useState } from "react";

import faq from "../assets/faq.png";

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = [
        {
            question: "How do I place an order on Quenzy?",
            answer: "Browse products, add them to your cart, and proceed to checkout. Once you fill in your shipping details and confirm, your order will be placed.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "Currently, we support Cash on Delivery (COD). Online payments will be available soon.",
        },
        {
            question: "How can I track my order?",
            answer: "After placing your order, you can view the status on the 'Orders' page under your profile.",
        },
        {
            question: "Can I cancel or modify my order after placing it?",
            answer: "Yes, you can cancel or modify your order before it is shipped. Once the order is shipped, cancellation or changes may not be possible.",
        },
        {
            question: "Do you deliver to rural areas?",
            answer: "Yes, Quenzy delivers to most locations, including rural areas. Please ensure you provide accurate address and contact details.",
        },
        {
            question: "What if a product is out of stock?",
            answer: "If a product is out of stock, you won’t be able to add it to the cart. You can check back later to see if it’s available again.",
        },
        {
            question: "Is there a return or refund policy?",
            answer: "Currently, we do not support returns or refunds. Please review the product details carefully before placing an order.",
        },
        {
            question: "Can I save items for later?",
            answer: "At the moment, we do not have a wishlist feature. However, you can keep items in your cart for future reference.",
        },
    ];

    return (
        <div className="py-30 px-5 bg-base-300">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 p-10 md:p-10 bg-base-100 rounded-xl shadow-lg">
                <div className="">
                    <img
                        className="max-w-sm w-150 rounded-xl h-auto"
                        src={faq}
                        alt=""
                    />
                </div>
                <div>
                    <p className="text-primary text-sm font-medium">FAQ's</p>
                    <h1 className="text-3xl font-semibold">
                        Looking for answer?
                    </h1>
                    <p className="text-sm text-base-content/80 mt-2 pb-4">
                        We’ve got you covered. Explore commonly asked questions
                        about how Quenzy works, what we offer, and how to get
                        the most out of your shopping experience.
                    </p>
                    {faqs.map((faq, index) => (
                        <div
                            className="border-b border-slate-200 py-4 cursor-pointer"
                            key={index}
                            onClick={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-base-content font-medium">
                                    {faq.question}
                                </h3>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`${
                                        openIndex === index ? "rotate-180" : ""
                                    } transition-all duration-500 ease-in-out`}
                                >
                                    <path
                                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="stroke-primary"
                                    />
                                </svg>
                            </div>
                            <p
                                className={`text-sm text-base-content/70 transition-all duration-500 ease-in-out ${
                                    openIndex === index
                                        ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                                        : "opacity-0 max-h-0 -translate-y-2"
                                }`}
                            >
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
