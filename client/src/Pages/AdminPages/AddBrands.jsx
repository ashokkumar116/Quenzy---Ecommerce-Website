import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";
import { SiTicktick } from "react-icons/si";

const AddBrands = () => {
    const [name, setName] = useState("");
    const [brands, setBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [editId,setEditId] = useState(null);
    const [deleteId,setDeleteId] = useState(null);

    // Pagination state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 5;
    

    const fetchBrands = async () => {
        try {
            const res = await axios.get(`/brands/getbrands?page=${page}&limit=${limit}`);
            setBrands(res.data.brands);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Error fetching brands:", error);
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while fetching brands."
            );
        }
    };

    useEffect(() => {
        fetchBrands();
    });

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

    const handleEditModal = (brand) => {
        setShowModal(true);
        setEditId(brand.id);
        setEditName(brand.name);
    };

    const handleEditSave = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.put(`/brands/updatebrand/${editId}`, {name:editName});
            if (response.status === 200) {
                toast.success("Brand updated successfully!");
                setShowModal(false);
                fetchBrands();
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while updating the brand."
            );
        }
    }

    const handleShowDeleteModal = (brand) => {
        setShowDeleteModal(true);
        setDeleteId(brand.id);
    }

    const handleDelete = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.delete(`/brands/deletebrand/${deleteId}`);
            if (response.status === 200) {
                toast.success("Brand deleted successfully!");
                setShowDeleteModal(false);
                fetchBrands(); 
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while deleting the brand."
            );
            
        }
    }

    return (
        <div className="pt-20">
            <h1 className="text-3xl text-primary uppercase font-bold mb-6">Add Brands</h1>
            <form onSubmit={handleSubmit} className="flex items-center gap-5 max-md:flex-col">
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand Name"
                    className="input-prime"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Add Brand +
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
            <div className="bg-base-100  shadow-lg rounded-lg overflow-x-scroll">
                <h2 className="text-2xl font-bold mt-10 mb-5 text-primary py-2 px-5">Brands List</h2>
                <table className="pl-5  transition-all duration-300 rounded-lg p-3 w-full table text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>

                    <tbody className="px-5 py-2 cursor-pointer rounded-md gap-5">
                        {brands.map((brand) => (
                            <tr>
                                <td>{brand.name}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={()=>handleEditModal(brand)}
                                    >
                                        <FaEdit />
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-error" onClick={()=>handleShowDeleteModal(brand)}>
                                        <FaRegTrashAlt />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {/* Pagination Buttons */}
            <div className="flex justify-center mt-6 gap-2 pb-3">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="btn btn-sm"
                        disabled={page === 1}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num + 1}
                            onClick={() => setPage(num + 1)}
                            className={`btn btn-sm ${
                                page === num + 1 ? "btn-primary" : "btn-ghost"
                            }`}
                        >
                            {num + 1}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        className="btn btn-sm"
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal component */}

            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-[rgba(1,1,1,0.8)] flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-1/3 z-80 flex flex-col gap-5">
                        <h1 className="text-2xl font-bold uppercase text-primary">Edit Brand</h1>
                        <form onSubmit={handleEditSave} className="flex flex-col gap-5 items-center">
                            <input type="text" className="input-prime" placeholder="Name " value={editName} onChange={(e)=>setEditName(e.target.value)} />
                            <div className="flex gap-3">
                            <button type="submit" className="btn btn-success"> <FaRegSave/> Save Changes</button>
                            <button className="btn btn-outline btn-error" onClick={()=>setShowModal(false)} ><IoMdCloseCircleOutline/>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && 
                <div>
                    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(1,1,1,0.8)] flex items-center justify-center z-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg w-1/3 z-80 flex flex-col gap-5 items-center">
                            <h1 className="text-2xl font-bold uppercase text-primary">Delete Brand</h1>
                            <p>Are you sure you want to delete this brand?</p>
                            <div className="flex gap-3">
                                <button className="btn btn-success" onClick={handleDelete}><SiTicktick/>Yes</button>
                                <button className="btn btn-outline btn-error" onClick={()=>setShowDeleteModal(false)}><CiNoWaitingSign/>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default AddBrands;
