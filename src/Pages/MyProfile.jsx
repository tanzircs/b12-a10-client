import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user, loading, updateUserProfile } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await updateUserProfile(name, photo);
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      console.error("Update Failed:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{name || "My Profile"} - EcoTrack</title>
      </Helmet>
      <div className="min-h-screen bg-base-200 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>
          <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="avatar justify-center pt-8">
              <div className="w-32 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                <img
                  src={photo || "https://api.lorem.space/image/face?hash=33791"}
                  alt={name}
                />
              </div>
            </div>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">{name || "Name not set"}</h2>
              <p className="text-gray-500 mt-2">{user.email}</p>

              <form onSubmit={handleProfileUpdate} className="w-full mt-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="url"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="input input-bordered"
                    disabled
                  />
                </div>

                <div className="card-actions mt-6 justify-center">
                  <button
                    type="submit"
                    className="btn btn-success text-white"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
