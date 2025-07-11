import { Button } from "primereact/button";
import React from "react";
import {InputText} from 'primereact/inputtext'
import { Password} from 'primereact/password'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="h-[100vh] flex justify-center items-center">
            <div className="form flex justify-center items-center gap-7 bg-base-200 shadow-lg rounded-md w-[70%] h-[70%] ">
                <div className="p-20 rounded-md flex flex-col justify-center items-center gap-6">
                <h1 className="text-3xl text-primary font-bold">Login</h1>
                <form className="flex flex-col justify-center items-center gap-6">
                    <InputText className="input-prime" placeholder="Email" />
                    <Password className="input-password" inputClassName="p-3 border-b border-primary outline-none w-100 " placeholder="Password" />
                    <button type="submit" className="btn btn-primary">Login</button>
                    <p className="text-primary">Don’t have an account? <Link to={'/register'} className="underline font-bold">Sign up</Link></p>
                </form>
                </div>
                <div className="flex justify-center items-center">
                    <img src="../src/assets/login-comp.png" className="p-5" />
                </div>
            </div>
        </div>
    );
};

export default Login;
