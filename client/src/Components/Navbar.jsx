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
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import logo from "../assets/navlogo.png"; // ✅ Proper logo import

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { cart } = useCart();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
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

    const handleMobileMenuToggle = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-base-100 px-5 py-2 max-md:py-6 shadow-lg backdrop-blur-xl">
            <nav className="flex justify-between items-center">
                {/* Logo */}
                <div className="cursor-pointer" onClick={() => navigate("/")}>
                    <img className="w-60 max-md:w-40" src={logo} alt="Logo" />
                </div>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex items-center gap-6">
                    <li>
                        <form onSubmit={handleSearch} className="flex items-center border-b border-primary">
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
                        className="cursor-pointer hover:bg-base-200 transition flex justify-center items-center gap-2 bg-base-300 px-5 py-2 rounded-lg text-primary"
                        onClick={() => navigate("/products")}
                    >
                        <AiOutlineProduct /> Products
                    </li>
                    <li
                        className="relative cursor-pointer hover:text-primary transition"
                        onClick={() => navigate("/cart")}
                    >
                        <IoCartOutline className="text-2xl text-primary" />
                        <div className="hidden lg:block absolute -top-3 -right-3">
                            <Badge value={cart.length || 0} severity="success" />
                        </div>
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
                                <button className="btn btn-primary flex items-center gap-2">
                                    <MdLogin />
                                    Login
                                </button>
                            </Link>
                        )}
                    </li>
                </ul>
                <div className="lg:hidden absolute right-15">
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
                                <button className="btn btn-primary flex items-center gap-2 w-full">
                                    <MdLogin />
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden">
                    <FaBars className="text-2xl cursor-pointer" onClick={handleMobileMenuToggle} />
                </div>
            </nav>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="lg:hidden absolute top-20 right-5 bg-base-100 p-4 rounded-lg shadow-lg w-72 z-50 flex flex-col gap-4 animate-slide-down">
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center border-b border-primary"
                    >
                        <GoSearch />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="outline-none p-2 w-full"
                            placeholder="Search"
                        />
                    </form>
                    <div
                        className="flex items-center gap-2 text-primary cursor-pointer hover:bg-base-200 p-2 rounded"
                        onClick={() => navigate("/products")}
                    >
                        <AiOutlineProduct /> Products
                    </div>
                    <div
                        className="flex items-center gap-2 text-primary cursor-pointer hover:bg-base-200 p-2 rounded"
                        onClick={() => navigate("/cart")}
                    >
                        <IoCartOutline className="text-lg" />
                        Cart <span>({cart.length || 0})</span>
                    </div>
                </div>
            )}

            {/* Dropdown Menu */}
            {showDropdown && (
                <div className="absolute top-24 right-5 bg-base-100 shadow-lg rounded-lg p-4 w-60 z-50 animate-fade-in">
                    <ul className="flex flex-col gap-2">
                        <li
                            className="flex items-center gap-2 p-2 rounded hover:bg-primary hover:text-white cursor-pointer"
                            onClick={() => {
                                navigate("/profile");
                                setShowDropdown(false);
                            }}
                        >
                            <FaRegUser /> Profile
                        </li>
                        <li
                            className="flex items-center gap-2 p-2 rounded hover:bg-primary hover:text-white cursor-pointer"
                            onClick={() => {
                                navigate("/my-orders");
                                setShowDropdown(false);
                            }}
                        >
                            <FiShoppingBag /> Orders
                        </li>
                        <li
                            className="flex items-center gap-2 p-2 rounded hover:bg-primary hover:text-white cursor-pointer"
                            onClick={() => {
                                navigate("/wishlist");
                                setShowDropdown(false);
                            }}
                        >
                            <FaRegHeart /> Wishlist
                        </li>
                        <li
                            className="btn btn-error w-full flex items-center gap-2 justify-center mt-2"
                            onClick={() => {
                                logout();
                                setShowDropdown(false);
                            }}
                        >
                            <BiLogOut /> Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
