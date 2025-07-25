import React, { useContext, useState } from "react";

import { GoSearch } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { Badge } from "primereact/badge";
import { AuthContext } from "../Contexts/AuthContext";
import { MdLogin } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { useCart } from "../Contexts/CartContext";
import { asset } from "../assets/asset";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    console.log(user);
    const navigate = useNavigate();
    const { cart } = useCart();
    const [showDropdown, setShowDropdown] = useState(false);

    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    const handleToggle = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="fixed top-0 bg-base-100 z-100 w-[100%] px-5 py-2 shadow-lg backdrop-blur-xl">
            <nav className="flex justify-between items-center">
                <div
                    className="logo flex items-center cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img
                        className="w-60"
                        src="../../src/assets/navlogo.png"
                        alt=""
                    />
                </div>
                <div className="menus">
                    <ul className="flex justify-center items-center gap-6">
                        <li className="flex justify-center items-center border-b border-primary ">
                            <form
                                className="flex justify-center items-center border-b border-primary"
                                onSubmit={handleSearch}
                            >
                                <GoSearch />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="outline-none p-2"
                                    placeholder="Search"
                                />
                            </form>
                        </li>
                        <li
                            className="flex justify-center items-center gap-2 p-overlay-badge cursor-pointer bg-base-300 px-5 py-2 rounded-lg hover:bg-base-200 transition duration-150"
                            onClick={() => navigate("/products")}
                        >
                            Products
                        </li>
                        <li
                            className="flex justify-center items-center gap-2 p-overlay-badge cursor-pointer"
                            onClick={() => navigate("/cart")}
                        >
                            <IoCartOutline className="text-2xl" />
                            <Badge
                                value={cart.length || null}
                                severity="success"
                            />
                        </li>
                        <li>
                            {user ? (
                                user.profile_pic ? (
                                    <img
                                        src={`${asset.imageBaseUrl}${user.profile_pic}`}
                                        alt="User"
                                        onClick={handleToggle}
                                        className="h-10 w-10 rounded-full border border-primary cursor-pointer"
                                    />
                                ) : (
                                    <FaUserCircle
                                        size={40}
                                        onClick={handleToggle}
                                        className="text-primary cursor-pointer"
                                    />
                                )
                            ) : (
                                <Link to={"/login"}>
                                    <button className="btn btn-primary">
                                        <MdLogin />
                                        Login
                                    </button>
                                </Link>
                            )}
                        </li>
                        {showDropdown && (
                            <div className="fixed bg-base-100 top-23 right-5 transition-all duration-300 ease-in-out w-50 rounded-lg animate-dropdown">
                                <ul className="shadow-lg rounded-md p-4 flex flex-col gap-2 justify-center items-center">
                                    <li
                                        className="py-2 px-10 rounded-md hover:bg-primary/60 cursor-pointer transition-all duration-120 "
                                        onClick={() => {
                                            navigate("/profile");
                                            setShowDropdown(false);
                                        }}
                                    >
                                        Profile
                                    </li>
                                    <li
                                        className="py-2 px-10 rounded-md hover:bg-primary/60 cursor-pointer transition-all duration-120 "
                                        onClick={() => {
                                            navigate("/orders");
                                            setShowDropdown(false);
                                        }}
                                    >
                                        Orders
                                    </li>
                                    <li
                                        className="py-2 px-10 rounded-md hover:bg-primary/60 cursor-pointer transition-all duration-120 "
                                        onClick={() => {
                                            navigate("/wishlist");
                                            setShowDropdown(false);
                                        }}
                                    >
                                        Wishlist
                                    </li>
                                    <li
                                        className="py-2 px-10 rounded-md btn btn-error cursor-pointer transition-all duration-120 "
                                        onClick={() => {
                                            logout();
                                            setShowDropdown(false);
                                        }}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
