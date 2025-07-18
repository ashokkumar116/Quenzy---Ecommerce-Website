
import axios from "../axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../Contexts/AuthContext";

const Login = () => {

    const [values,setValues] = useState({});
    const navigate = useNavigate();
    const {login, message} = useContext(AuthContext);

    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            
            const success = await login(values);
            if(success){
                navigate('/');
            }

        } catch (error) {   
            console.log(error);
        }
    }
    return (
        <div className="h-[100vh] flex justify-center items-center">
            <div className="form flex justify-center items-center gap-7 bg-base-200 shadow-lg rounded-md w-[70%] h-[70%] ">
                <div className="p-20 rounded-md flex flex-col justify-center items-center gap-6">
                <h1 className="text-3xl text-primary font-bold">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6">
                    <input className="input-prime" placeholder="Email" name="email" onChange={handleChange} />
                    <input className="input-prime" placeholder="Password" type="password" name="password" onChange={handleChange}/>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <p className="text-primary">Don’t have an account? <Link to={'/register'} className="underline font-bold">Sign up</Link></p>
                </form>
                {message && <p className="text-error" >{message}</p>}
                </div>
                <div className="flex justify-center items-center">
                    <img src="../src/assets/login-asset.png" className="p-5" />
                </div>
            </div>
        </div>
    );
};

export default Login;
