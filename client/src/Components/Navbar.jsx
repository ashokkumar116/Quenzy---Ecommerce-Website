import React, { useContext } from "react";

import { GoSearch } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { Badge } from "primereact/badge";
import { AuthContext } from "../Contexts/AuthContext";
import { MdLogin } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {

    const {user} = useContext(AuthContext);
    console.log(user); 
    const navigate = useNavigate(); 

    return (
        <div className="fixed top-0 bg-base-300 z-100 w-[100%] px-5 py-2 shadow-lg backdrop-blur-xl">
            <nav className="flex justify-between items-center">
                <div className="logo flex items-center cursor-pointer" onClick={()=>navigate('/')}>
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
                        <li>
                            {user ? <p>{user.name}</p> :<Link to={'/login'} ><button className="btn btn-primary" ><MdLogin />Login</button></Link> }
                        </li>   
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
