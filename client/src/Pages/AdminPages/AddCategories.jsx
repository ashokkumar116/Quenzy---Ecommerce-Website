import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
const AddCategories = () => {

  const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [editId,setEditId] = useState(null);
    const [deleteId,setDeleteId] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("/categories/getcategories");
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching Categories:", error);
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while fetching Categories."
            );
        }
    };

    useEffect(() => {
      fetchCategories();
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/categories/addcategory", { name });

            if (res.status === 201) {
                setName("");
                fetchCategories();
                toast.success("Category added successfully!");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while adding the Category."
            );
        }
    };

    const handleEditModal = (category) => {
        setShowModal(true);
        setEditId(category.id);
        setEditName(category.name);
    };

    const handleEditSave = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.put(`/categories/updatecategory/${editId}`, {name:editName});
            if (response.status === 200) {
                toast.success("Category updated successfully!");
                setShowModal(false);
                fetchCategories();
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while updating the Category."
            );
        }
    }

    const handleShowDeleteModal = (category) => {
        setShowDeleteModal(true);
        setDeleteId(category.id);
    }

    const handleDelete = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.delete(`/categories/deletecategory/${deleteId}`);
            if (response.status === 200) {
                toast.success("Category deleted successfully!");
                setShowDeleteModal(false);
                fetchCategories(); 
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "An error occurred while deleting the Category."
            );
            
        }
    }


  return (
    <div className="pt-20">
        <h1 className="text-3xl text-primary uppercase font-bold mb-6">Add Categories</h1>
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
                Add Category
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
            <h2 className="text-2xl font-bold mt-10 mb-5 text-primary">Categories List</h2>
            <table className="pl-5 bg-base-100 transition-all duration-300 rounded-lg shadow-lg p-3 w-100 table text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>

                <tbody className="px-5 py-2 cursor-pointer rounded-md gap-5">
                    {categories.map((category) => (
                        <tr>
                            <td>{category.name}</td>
                            <td>
                                <button
                                    className="btn btn-warning"
                                    onClick={()=>handleEditModal(category)}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-error" onClick={()=>handleShowDeleteModal(category)}>
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
                    <h1 className="text-2xl font-bold uppercase text-primary">Edit Category</h1>
                    <form onSubmit={handleEditSave} className="flex flex-col gap-5 items-center">
                        <input type="text" className="input-prime" placeholder="Name " value={editName} onChange={(e)=>setEditName(e.target.value)} />
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
                        <h1 className="text-2xl font-bold uppercase text-primary">Delete Category</h1>
                        <p>Are you sure you want to delete this Category?</p>
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

export default AddCategories
