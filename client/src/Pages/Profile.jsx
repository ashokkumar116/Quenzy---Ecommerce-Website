import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import MiniQuenzyLoader from "../Loader/MiniQuenzyLoader";
import { asset } from "../assets/asset";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "../axios";
import { RiImageEditFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";


const Profile = () => {
    const { user, loading, fetchUser } = useContext(AuthContext);
    const [disabledField, setDisabledField] = useState(true);
    const [name, setName] = useState(user.name || "");
    const [contact, setContact] = useState(user.contact || "");
    const [profile_pic, setProfile_Pic] = useState(null);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [preview, setPreview] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("/auth/edituser", {
                name,
                contact,
            });
            if (response.status === 200) {
                await fetchUser();
                toast.success("Profile Updated Successfully!");
            }
        } catch (error) {
            console.log("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    const handleImageEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("profile_pic", profile_pic);

        try {
            const response = await axios.put(`/auth/profileupload`, formData);
            if (response.status === 200) {
                await fetchUser();
                toast.success("Profile Image Updated Successfully!");
            }
        } catch (error) {
            console.log("Error Uploading Profile pic", error);
            toast.error(error?.response?.data?.message || "Failed to update profile image.");
        }
    };

    if (loading) {
        return <MiniQuenzyLoader />;
    }

    return (
        <div className="py-25 flex bg-base-300 min-h-screen px-10 gap-10">
            <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="bg-base-100 rounded-2xl px-10 pt-10 pb-4 overflow-hidden border border-base-300 h-131 relative">
                    {user.profile_pic ? (
                        <>
                            {profile_pic ? (
                                <img
                                    src={URL.createObjectURL(profile_pic)}
                                    alt="User"
                                    className="w-64 h-75 object-cover object-top cursor-pointer"
                                />
                            ) : (
                                <img
                                    src={`${asset.imageBaseUrl}${user.profile_pic}`}
                                    alt="User"
                                    className="w-64 h-75 object-cover object-top cursor-pointer"
                                />
                            )}
                            <input
                                type="file"
                                name="profile_pic"
                                id="profile_pic_edit"
                                className="hidden"
                                onChange={(e) =>
                                    setProfile_Pic(e.target.files[0])
                                }
                            />
                            <label htmlFor="profile_pic_edit">
                                <RiImageEditFill
                                    size={35}
                                    className="absolute bottom-43 right-7 rounded-full bg-base-100 p-1.5 cursor-pointer"
                                />
                            </label>
                        </>
                    ) : (
                        <>
                        {profile_pic ? (
                                <img
                                    src={URL.createObjectURL(profile_pic)}
                                    alt="User"
                                    className="w-64 h-75 object-cover object-top cursor-pointer"
                                />
                            ) : (
                                <div className="w-64 h-75 bg-base-300 cursor-pointer flex justify-center items-center">
                                    <p className="text-base-content/30">No Profile Pic Added</p>
                                </div>
                            )}
                            
                        <input
                                type="file"
                                name="profile_pic"
                                id="profile_pic_edit"
                                className="hidden"
                                onChange={(e) =>
                                    setProfile_Pic(e.target.files[0])
                                }
                            />
                        <label htmlFor="profile_pic_edit">
                                <RiImageEditFill
                                    size={35}
                                    className="absolute bottom-43 right-7 rounded-full bg-base-100 p-1.5 cursor-pointer"
                                />
                        </label>
                        </>
                        
                    )}
                    <div className="flex flex-col items-center">
                        <p className="font-medium mt-3">{user.name}</p>
                        <p className="text-base-content/60 text-sm">{user.email}</p>
                        <p className="text-base-content/60 text-sm">
                            {user.contact
                                ? `${user.contact}`
                                : "No Contact Number Provided"}
                        </p>
                    </div>
                    {/* {showSaveButton ? (
                        <>
                            <button className="btn btn-success">Save</button>
                            <button className="btn btn-error">Cancel</button>
                        </>
                    ) : (
                        <>

                        </>
                    )} */}

                    {profile_pic && (
                        <div className="flex justify-center items-center gap-4 mt-5">
                            <button className="btn btn-success" onClick={handleImageEdit}><FaRegSave/> Save</button>
                            <button className="btn btn-error" onClick={()=>setProfile_Pic(null)} ><MdCancelPresentation/> Cancel</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-1 bg-base-100 p-5 rounded-lg border border-base-300/80">
                <form className="grid grid-cols-2 gap-5 mb-5">
                    <input
                        type="text"
                        className="input input-primary"
                        placeholder="Name"
                        value={name}
                        disabled={disabledField}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        className="input input-primary"
                        placeholder="Email"
                        value={user.email}
                        disabled
                    />
                    <input
                        type="number"
                        className="input input-primary"
                        placeholder="Contact"
                        value={contact}
                        disabled={disabledField}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </form>
                {disabledField ? (
                    <button
                        className="btn btn-error"
                        type="submit"
                        onClick={() => setDisabledField(false)}
                    >
                        <FaRegEdit/> Edit
                    </button>
                ) : (
                    <>
                        <button
                            type="submit"
                            className="btn btn-success mr-5"
                            onClick={(e) => {
                                handleSubmit(e);
                                setDisabledField(true);
                            }}
                        >
                            <FaRegSave/> Save
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={(e) => {
                                setDisabledField(true);
                            }}
                        >
                            <MdCancelPresentation/> Cancel
                        </button>
                    </>
                )}
            </div>
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

export default Profile;
