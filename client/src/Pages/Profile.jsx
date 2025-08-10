import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import MiniQuenzyLoader from "../Loader/MiniQuenzyLoader";
import { asset } from "../assets/asset";
import { ToastContainer, toast } from "react-toastify";
import axios from "../axios";
import { RiImageEditFill } from "react-icons/ri";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";

const Profile = () => {
  const {user, loading, fetchUser} = useContext(AuthContext);
  const [disabledField, setDisabledField] = useState(true);
  const [name, setName] = useState(user.name || "");
  const [contact, setContact] = useState(user.contact || "");
  const [profile_pic, setProfile_Pic] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/auth/edituser", { name, contact });
      if (response.status === 200) {
        await fetchUser();
        toast.success("Profile Updated Successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
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
      console.error("Error Uploading Profile pic", error);
      toast.error(error?.response?.data?.message || "Failed to update profile image.");
    }
  };

  if (loading) return <MiniQuenzyLoader />;

  return (
    <div className="py-30 flex bg-base-300 min-h-screen px-4 lg:px-10 gap-10 flex-col lg:flex-row">
      
      {/* Profile Picture Card */}
      <div className="flex justify-center">
        <div className="bg-base-100 rounded-2xl p-4 lg:p-6 border border-base-300 relative max-w-sm w-full">
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg">
            {profile_pic ? (
              <img
                src={URL.createObjectURL(profile_pic)}
                alt="User"
                className="w-full h-full object-cover object-top"
              />
            ) : user.profile_pic ? (
              <img
                src={`${asset.imageBaseUrl}${user.profile_pic}`}
                alt="User"
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-base-300 flex justify-center items-center">
                <p className="text-base-content/30 text-sm">No Profile Pic Added</p>
              </div>
            )}
            <input
              type="file"
              name="profile_pic"
              id="profile_pic_edit"
              className="hidden"
              onChange={(e) => setProfile_Pic(e.target.files[0])}
            />
            <label htmlFor="profile_pic_edit">
              <RiImageEditFill
                size={35}
                className="absolute -bottom-2 -right-2 rounded-full bg-base-100 p-1.5 cursor-pointer shadow-md"
              />
            </label>
          </div>

          <div className="flex flex-col items-center mt-4 text-center">
            <p className="font-medium">{user.name}</p>
            <p className="text-base-content/60 text-sm">{user.email}</p>
            <p className="text-base-content/60 text-sm">
              {user.contact || "No Contact Number Provided"}
            </p>
          </div>

          {profile_pic && (
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-5">
              <button className="btn btn-success flex-1" onClick={handleImageEdit}>
                <FaRegSave /> Save
              </button>
              <button className="btn btn-error flex-1" onClick={() => setProfile_Pic(null)}>
                <MdCancelPresentation /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <div className="flex-1 bg-base-100 p-5 rounded-lg border border-base-300/80 mt-5 lg:mt-0">
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <input
            type="text"
            className="input input-primary w-full"
            placeholder="Name"
            value={name}
            disabled={disabledField}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="input input-primary w-full"
            placeholder="Email"
            value={user.email}
            disabled
          />
          <input
            type="number"
            className="input input-primary w-full"
            placeholder="Contact"
            value={contact}
            disabled={disabledField}
            onChange={(e) => setContact(e.target.value)}
          />
        </form>

        {disabledField ? (
          <button
            className="btn btn-error w-full sm:w-auto"
            type="button"
            onClick={() => setDisabledField(false)}
          >
            <FaRegEdit /> Edit
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="btn btn-success flex-1"
              onClick={(e) => {
                handleSubmit(e);
                setDisabledField(true);
              }}
            >
              <FaRegSave /> Save
            </button>
            <button
              className="btn btn-error flex-1"
              onClick={() => setDisabledField(true)}
            >
              <MdCancelPresentation /> Cancel
            </button>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Profile;
