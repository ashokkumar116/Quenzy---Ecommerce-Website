import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

const AddBrands = () => {
    const [name, setName] = useState("");
    const [brands, setBrands] = useState([]);

    const fetchBrands = async () => {
        try {
            const res = await axios.get("/brands/getbrands");
            setBrands(res.data);
        } catch (error) {
            console.error("Error fetching brands:", error);
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while fetching brands."
            );
        }
    }

    useEffect(()=>{
        fetchBrands();
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/brands/addbrand", { name });

            if (res.status === 201) {
                setName("");
                fetchBrands();
                toast.success("Brand added successfully!");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while adding the brand."
            );
        }
    };

    return (
        <div className="pt-20">
            <h1 className="text-3xl uppercase font-bold mb-6">Add Brands</h1>
            <form onSubmit={handleSubmit} className="flex items-center gap-5">
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand Name"
                    className="input-prime"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Add Brand
                </button>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </form>
            <div>
                <h2 className="text-2xl font-bold mt-10 mb-5">Brands List</h2>
                <ul className="list-disc pl-5">
                    {brands.map((brand) => (
                        <p>{brand.name}</p>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddBrands;
