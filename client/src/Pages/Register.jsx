
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from '../axios';

const Register = () => {

    const [values,setValues] = useState({});
    const [message,setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(values.password.length < 8){
            setMessage("Password must be at least 8 characters long");
            return;
        }
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailregex.test(values.email)){
            setMessage("Please enter a valid email address");
            return;
        }
        try {
            const response = await axios.post('/auth/register',values);
            if(response.status === 201){
                navigate('/login');
            }
        } catch (error) {
            setMessage(error.response.data.message);
            console.log(error);
        }



    }
    
  return (
    <div className="h-[100vh] flex justify-center items-center mt-20">
            <div className="form flex justify-center items-center gap-7 bg-base-200 shadow-lg rounded-md w-[70%] ">
                <div className="p-20 rounded-md flex flex-col justify-center items-center gap-6">
                <h1 className="text-3xl text-primary font-bold">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6">
                    <input className="input-prime" placeholder="Name" name="name" onChange={handleChange} />
                    <input className="input-prime" placeholder="Email" name="email" onChange={handleChange} />
                    <input className="input-prime " placeholder="Mobile Number (Optional)" name="contact" type="number" onChange={handleChange} />
                    <input className="input-prime " placeholder="Password" name="password" type="password" onChange={handleChange} />
                    <button type="submit" className="btn btn-primary">Register</button>
                    <p className="text-primary">Already have an account? <Link to={'/login'} className="underline font-bold">Sign In</Link></p>
                </form>
                {message && <p className='text-error' >{message}</p>}
                </div>
                <div className="flex justify-center items-center">
                    <img src="../src/assets/login-asset.png" className="p-5" />
                </div>
            </div>
        </div>
  )
}

export default Register
