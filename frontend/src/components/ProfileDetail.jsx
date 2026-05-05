import React, { useState, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setProfileDetail } from "../redux/slices/conditionSlice";
import { addAuth } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const ProfileDetail = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth);
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const handleImageUpdate = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            return toast.error("Please select a JPG or PNG image");
        }

        try {
            setUploading(true);
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "chat_app_preset");
            data.append("cloud_name", "dmnhcrurz");

            // 1. Cloudinary Upload
            const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dmnhcrurz/image/upload", {
                method: "POST",
                body: data,
            });

            const cloudData = await cloudRes.json();
            if (cloudData.error) return toast.error(cloudData.error.message);

            const imageUrl = cloudData.secure_url;

            // 2. Backend Update
            const backendRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/update-pic`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ image: imageUrl }),
            });

            const updatedUser = await backendRes.json();

            if (backendRes.ok) {
                dispatch(addAuth(updatedUser.data));
                toast.success("Profile Picture Updated!");
            } else {
                toast.error(updatedUser.message || "Update failed");
            }

        } catch (error) {
            toast.error("Something went wrong during upload");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex -m-2 sm:-m-4 flex-col items-center my-6 text-slate-300 min-h-screen w-full fixed top-0 justify-center z-50 bg-black/50">
            <div className="p-3 pt-4 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-800 rounded-lg h-fit transition-all relative">
                
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpdate} />

                <button onClick={() => dispatch(setProfileDetail(false))} className="absolute top-2 right-2 text-2xl hover:text-red-500">
                    <MdOutlineClose />
                </button>

                <h2 className="text-2xl underline underline-offset-8 font-semibold text-slate-100 w-full text-center mb-2">Profile</h2>
                
                <div className="w-full py-4 justify-evenly flex flex-wrap items-center gap-3">
                    <div>
                        <h3 className="text-xl font-semibold p-1">Name : {user?.firstName} {user?.lastName}</h3>
                        <h3 className="text-xl font-semibold p-1">Email : {user?.email}</h3>
                    </div>

                    <div className="flex flex-col items-center">
                        <img 
                            src={user?.image || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} 
                            className="w-24 h-24 rounded-md object-cover border-2 border-slate-500" 
                            alt="user" 
                        />
                        <button 
                            onClick={() => fileInputRef.current.click()} 
                            disabled={uploading}
                            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1.5 px-4 rounded mt-3 disabled:bg-gray-500"
                        >
                            {uploading ? "Uploading..." : "Update"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;