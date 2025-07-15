import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
const AddSeller = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [sellers, setSellers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editId,setEditId] = useState(null);
    const [deleteId,setDeleteId] = useState(null);

    const fetchSellers = async () => {
        try {
            const res = await axios.get("/sellers/getallsellers");
            setSellers(res.data);
        } catch (error) {
            console.error("Error fetching Sellers:", error);
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while fetching Sellers."
            );
        }
    };

    useEffect(() => {
      fetchSellers();
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/sellers/addSeller", { name,email,phone });

            if (res.status === 201) {
                setName("");
                setEmail("");
                setPhone("");
                fetchSellers();
                toast.success("Seller added successfully!");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while adding the Seller."
            );
        }
    };

    const handleEditModal = (seller) => {
        setShowModal(true);
        setEditId(seller.id);
        setEditName(seller.name);
        setEditEmail(seller.email);
        setEditPhone(seller.phone);

    };

    const handleEditSave = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.put(`/sellers/updateseller/${editId}`, {name:editName,email:editEmail,phone:editPhone});
            if (response.status === 200) {
                toast.success("Seller updated successfully!");
                setShowModal(false);
                fetchSellers();
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while updating the Seller."
            );
        }
    }

    const handleShowDeleteModal = (seller) => {
        setShowDeleteModal(true);
        setDeleteId(seller.id);
    }

    const handleDelete = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.delete(`/sellers/deleteseller/${deleteId}`);
            if (response.status === 200) {
                toast.success("Seller deleted successfully!");
                setShowDeleteModal(false);
                fetchSellers(); 
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while deleting the Seller."
            );
            
        }
    }


  return (
    <div className="pt-20">
        <h1 className="text-3xl text-primary uppercase font-bold mb-6">Add Seller</h1>
        <form onSubmit={handleSubmit} className="flex items-center gap-5">
            <input
                type="text"
                name="name"
                placeholder="Seller Name"
                className="input-prime"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                name="email"
                placeholder="Seller Email"
                className="input-prime"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                name="phone"
                placeholder="Seller Phone"
                className="input-prime"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
                Add Seller
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
            <h2 className="text-2xl font-bold mt-10 mb-5 text-primary">Sellers List</h2>
            <table className="pl-5 bg-base-100 transition-all duration-300 rounded-lg shadow-lg p-3 w-200 table text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>

                <tbody className="px-5 py-2 cursor-pointer rounded-md gap-5">
                    {sellers.map((seller) => (
                        <tr>
                            <td>{seller.name}</td>
                            <td>{seller.email}</td>
                            <td>{seller.phone}</td>
                            <td>
                                <button
                                    className="btn btn-warning"
                                    onClick={()=>handleEditModal(seller)}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-error" onClick={()=>handleShowDeleteModal(seller)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Modal component */}

        {showModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-[rgba(1,1,1,0.8)] flex items-center justify-center z-50">
                <div className="bg-white p-5 rounded-lg shadow-lg w-1/3 z-80 flex flex-col gap-5">
                    <h1 className="text-2xl font-bold uppercase text-primary">Edit Seller</h1>
                    <form onSubmit={handleEditSave} className="flex flex-col gap-5 items-center">
                        <input type="text" className="input-prime" placeholder="Name " value={editName} onChange={(e)=>setEditName(e.target.value)} />
                        <input type="email" className="input-prime" placeholder="Email " value={editEmail} onChange={(e)=>setEditEmail(e.target.value)} />
                        <input type="text" className="input-prime" placeholder="Phone " value={editPhone} onChange={(e)=>setEditPhone(e.target.value)} />
                        <div className="flex gap-3">
                        <button type="submit" className="btn btn-success">Save Changes</button>
                        <button className="btn btn-outline btn-error" onClick={()=>setShowModal(false)} >Close</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {showDeleteModal && 
            <div>
                <div className="fixed top-0 left-0 w-full h-full bg-[rgba(1,1,1,0.8)] flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-1/3 z-80 flex flex-col gap-5 items-center">
                        <h1 className="text-2xl font-bold uppercase text-primary">Delete Seller</h1>
                        <p>Are you sure you want to delete this Seller?</p>
                        <div className="flex gap-3">
                            <button className="btn btn-success" onClick={handleDelete}>Yes</button>
                            <button className="btn btn-outline btn-error" onClick={()=>setShowDeleteModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        }

    </div>
);
}

export default AddSeller
