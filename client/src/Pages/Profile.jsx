import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import MiniQuenzyLoader from "../Loader/MiniQuenzyLoader";
import { asset } from "../assets/asset";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
    const { user, loading } = useContext(AuthContext);
    const [disabledField,setDisabledField] = useState(true);
    const [name,setName] = useState("");
    const [contact,setContact] = useState("");

    

    if (loading) {
        return <MiniQuenzyLoader />;
    }

    return (
        <div className="py-25 flex bg-base-300 min-h-screen">
            <div className="flex flex-wrap items-center justify-center gap-4 px-10">
                <div className="bg-white rounded-2xl px-10 pt-10 pb-4 overflow-hidden border border-gray-500/30 h-115">
                    {user.profile_pic ? (
                        <img
                            src={`${asset.imageBaseUrl}${user.profile_pic}`}
                            alt="User"
                            className="w-64 h-75 object-cover object-top cursor-pointer"
                        />
                    ) : (
                        <FaUserCircle
                            size={200}
                            className="text-primary cursor-pointer"
                        />
                    )}
                    <div className="flex flex-col items-center">
                        <p className="font-medium mt-3">{user.name}</p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                        <p className="text-gray-500 text-sm">
                            {user.contact
                                ? `${user.contact}`
                                : "No Contact Number Provided"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-base-100 p-5">
                <form className="grid grid-cols-2 gap-5 mb-5">
                    <input type="text" className="input input-primary" placeholder="Name" value={user.name} disabled={disabledField} />
                    <input type="email" className="input input-primary" placeholder="Email" value={user.email} disabled />
                    <input type="number" className="input input-primary" placeholder="Contact" value={user.contact} disabled={disabledField} />
                </form>
                {disabledField ? (<button className="btn btn-error" onClick={()=>setDisabledField(false)} >Edit</button>): (<button className="btn btn-success" onClick={()=>setDisabledField(true)} >Save</button>)}
            </div>
        </div>
    );
};

export default Profile;
