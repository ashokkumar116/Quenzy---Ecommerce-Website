import axios from "../axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ContactUs = () => {

    const [formData,setFormData] = useState({});
    const [loading,setLoading] = useState(false);

    const  handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleMail = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/contactus/sendmail',formData);
            if(response.status === 200){
                setLoading(false);
                setFormData({});
                toast.success("Mail Sent Successfully");
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error("Failed to send mail");
        }
        finally{
            setLoading(false);
            setFormData({});
            e.target.reset();
        }
        
    }
    
    return (
        <div className="py-30 bg-base-300 flex flex-col items-center px-2">
            <form className="flex flex-col items-center text-sm bg-base-100 w-250 max-md:w-80 max-md:px-2  max-lg:w-170 overflow-hidden p-6 rounded-lg shadow-lg" onSubmit={handleMail}>
            <p className="text-lg text-primary font-medium pb-2">Contact Us</p>
            <h1 className="text-4xl font-semibold text-base-content/90 pb-4 text-center">Get in touch with us</h1>
            <p className="text-sm text-base-content/60 text-center pb-10 text-justify px-3">We’re always here to help! Whether you have questions about your order, need help choosing the right product, or just want to say hello — don’t hesitate to reach out.</p>
            
            <div className="flex flex-col lg:flex-row items-center gap-8 w-full px-2">
                <div className="w-full">
                    <label className="text-base-content/70" htmlFor="name">Your Name</label>
                    <input className="h-12 p-2 mt-2 w-full border border-base-content/80 rounded outline-none focus:border-primary/80" type="text" name="name" onChange={handleChange} required />
                </div>
                <div className="w-full">
                    <label className="text-base-content/70" htmlFor="name">Your Email</label>
                    <input className="h-12 p-2 mt-2 w-full border border-base-content/80 rounded outline-none focus:border-primary/80" type="email" name="email" onChange={handleChange} required />
                </div>
            </div>
        
            <div className="mt-6 w-full px-2">
                <label className="text-base-content/70" htmlFor="name">Message</label>
                <textarea className="w-full mt-2 p-2 h-40 border border-base-content/80 rounded resize-none outline-none focus:border-primary/80" name="message" onChange={handleChange} required></textarea>
            </div>
        
            {loading ? (<button type="submit" className="mt-5 btn btn-primary h-12 w-56 px-4 rounded active:scale-95 transition" disabled>Sending <span class="loading loading-bars loading-sm"></span></button>): (<button type="submit" className="mt-5 btn btn-primary h-12 w-56 px-4 rounded active:scale-95 transition">Send Message</button>) }
        </form>

        <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default ContactUs;
