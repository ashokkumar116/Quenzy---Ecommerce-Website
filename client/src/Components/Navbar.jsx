import React from "react";

import { GoSearch } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { Badge } from "primereact/badge";



const Navbar = () => {
    return (
        <div className="fixed top-0 bg-base-300 w-[100%] px-5 py-2 shadow-lg backdrop-blur-xl">
            <nav className="flex justify-between items-center">
                <div className="logo flex items-center">
                    <img
                        className="w-60"
                        src="../../src/assets/navlogo.png"
                        alt=""
                    />
                </div>
                <div className="menus">
                    <ul className="flex justify-center items-center gap-6">
                        <li className="flex justify-center items-center border-b border-primary ">
                            <GoSearch />
                            <input type="text" className="outline-none p-2" placeholder="Search" />
                            
                        </li>
                        <li className="flex justify-center items-center gap-2 p-overlay-badge">
                        <IoCartOutline className="text-2xl" />
                        <Badge value={3} severity="success" />
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
