import axios from "../axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { CiLogin } from "react-icons/ci";
import LoginImg from "../assets/login.png";

const Login = () => {
    const [values, setValues] = useState({});
    const navigate = useNavigate();
    const { login, message } = useContext(AuthContext);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await login(values);
            if (success) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="h-[100vh] flex justify-center items-center bg-base-300">
            <div className="form flex justify-center max-md:w-100 items-center gap-7 bg-base-100 shadow-lg rounded-lg w-[70%] h-[70%] ">
                <div className="p-20 rounded-md flex  flex-col justify-center items-center gap-6 max-sm:p-10">
                    <h1 className="text-3xl text-primary font-bold">Login</h1>
                    <p className="text-red-500 text-xs bg-red-100 p-2 rounded">
                        ⚠ Please enable <strong>third-party cookies</strong> in
                        your browser settings to log in
                        <span className="italic">
                            {" "}
                            (ignore if already enabled)
                        </span>
                        .
                        <br />
                        In Chrome: Go to{" "}
                        <span className="font-mono">
                            Settings → Privacy and security → Third Party Cookies
                        </span>{" "}
                        → Allow Third Party Cookies.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center items-center gap-6"
                    >
                        <input
                            className="input-prime max-md:w-90 max-sm:w-70"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                        />
                        <input
                            className="input-prime max-md:w-90 max-sm:w-70"
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                        <button type="submit" className="btn btn-primary">
                            <CiLogin /> Login
                        </button>
                        <p className="text-primary max-md:text-sm max-md:text-center">
                            Don’t have an account?{" "}
                            <Link
                                to={"/register"}
                                className="underline font-bold"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                    {message && <p className="text-error">{message}</p>}
                </div>
                <div className="flex justify-center items-center hidden xl:block">
                    <img src={LoginImg} className="p-5" />
                </div>
            </div>
        </div>
    );
};

export default Login;
