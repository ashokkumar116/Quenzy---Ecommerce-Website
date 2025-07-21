import React from "react";

const ContactUs = () => {
    return (
        <div className="py-30 bg-base-300 flex flex-col items-center">
            <form className="flex flex-col items-center text-sm bg-base-100 w-250 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-primary font-medium pb-2">Contact Us</p>
            <h1 className="text-4xl font-semibold text-base-content/90 pb-4">Get in touch with us</h1>
            <p className="text-sm text-base-content/60 text-center pb-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />Lorem Ipsum has been the industry's standard dummy text.</p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                <div className="w-full">
                    <label className="text-base-content/70" htmlFor="name">Your Name</label>
                    <input className="h-12 p-2 mt-2 w-full border border-base-content/80 rounded outline-none focus:border-primary/80" type="text" required />
                </div>
                <div className="w-full">
                    <label className="text-base-content/70" htmlFor="name">Your Email</label>
                    <input className="h-12 p-2 mt-2 w-full border border-base-content/80 rounded outline-none focus:border-primary/80" type="email" required />
                </div>
            </div>
        
            <div className="mt-6 w-[350px] md:w-[700px]">
                <label className="text-base-content/70" htmlFor="name">Message</label>
                <textarea className="w-full mt-2 p-2 h-40 border border-base-content/80 rounded resize-none outline-none focus:border-primary/80" required></textarea>
            </div>
        
            <button type="submit" className="mt-5 btn btn-primary h-12 w-56 px-4 rounded active:scale-95 transition">Send Message</button>
        </form>
        </div>
    );
};

export default ContactUs;
