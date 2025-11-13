import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressValue, setProgressValue] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchActivity = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/api/user-challenges/${id}`);
        setActivity(response.data.data);
        setProgressValue(response.data.data.progress);
      } catch (err) {
        console.error("Failed to fetch activity:", err);
        toast.error("Could not load your activity.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchActivity();
    }
  }, [id, user, authLoading, axiosSecure]);

  const handleUpdateProgress = async () => {
    try {
      const newStatus =
        progressValue > 0 && progressValue < 100
          ? "Ongoing"
          : progressValue === 100
          ? "Finished"
          : "Not Started";

      await axiosSecure.patch(`/api/user-challenges/${id}`, {
        progress: progressValue,
        status: newStatus,
      });

      setActivity((prev) => ({
        ...prev,
        progress: progressValue,
        status: newStatus,
      }));
      toast.success("Progress updated!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update progress.");
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="text-center p-12">
        <h2 className="text-2xl font-semibold text-red-500">
          Activity not found.
        </h2>
      </div>
    );
  }

  const { challengeDetails } = activity;

  return (
    <>
      <Helmet>
        <title>Update Progress: {challengeDetails.title}</title>
      </Helmet>

      <div className="min-h-screen bg-base-200 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Update Your Progress
          </h1>

          <div className="card bg-base-100 shadow-xl border">
            <figure className="h-64">
              <img
                src={challengeDetails.imageUrl}
                alt={challengeDetails.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-8">
              <span className="badge badge-success text-white font-semibold">
                {challengeDetails.category}
              </span>
              <h2 className="card-title text-2xl mt-2">
                {challengeDetails.title}
              </h2>
              <p className="text-gray-600 mt-2">
                {challengeDetails.description}
              </p>

              <div className="divider">My Progress</div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-lg font-semibold">
                    Current Progress: {progressValue}%
                  </span>
                  <span
                    className={`badge ${
                      activity.status === "Finished"
                        ? "badge-success"
                        : activity.status === "Ongoing"
                        ? "badge-warning"
                        : "badge-ghost"
                    }`}
                  >
                    {activity.status}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressValue}
                  onChange={(e) => setProgressValue(Number(e.target.value))}
                  className="range range-success"
                  disabled={activity.status === "Finished"}
                />
              </div>

              <div className="card-actions justify-between items-center mt-6">
                <button
                  onClick={() => navigate("/my-activities")}
                  className="btn btn-ghost"
                >
                  Back to List
                </button>
                <button
                  onClick={handleUpdateProgress}
                  className="btn btn-success text-white"
                  disabled={activity.status === "Finished"}
                >
                  <FaCheck /> Save Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyActivityDetail;
