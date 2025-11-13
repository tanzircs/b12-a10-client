import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FaTrashAlt, FaCheck, FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyActivities = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [myChallenges, setMyChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const axiosSecure = useAxiosSecure();

  const fetchMyChallenges = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await axiosSecure.get(
        `/api/user-challenges?userId=${user.uid}`
      );
      setMyChallenges(response.data.data);
    } catch (err) {
      console.error("Failed to fetch my challenges:", err);
      toast.error("Could not load your activities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchMyChallenges();
    }
  }, [user, authLoading]);

  const handleUpdateProgress = async (id) => {
    try {
      await axiosSecure.patch(`/api/user-challenges/${id}`, {
        progress: progressValue,
        status:
          progressValue > 0 && progressValue < 100
            ? "Ongoing"
            : progressValue === 100
            ? "Finished"
            : "Not Started",
      });
      toast.success("Progress updated!");
      setEditingId(null);
      fetchMyChallenges();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update progress.");
    }
  };

  const markAsFinished = async (id) => {
    try {
      await axiosSecure.patch(`/api/user-challenges/${id}`, {
        progress: 100,
        status: "Finished",
      });
      toast.success("Challenge marked as finished!");
      fetchMyChallenges();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to mark as finished.");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, leave challenge!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/user-challenges/${id}`)
          .then(() => {
            Swal.fire("Left!", "You have left the challenge.", "success");
            fetchMyChallenges();
          })
          .catch((err) => {
            console.error("Delete failed:", err);
            toast.error("Failed to leave challenge.");
          });
      }
    });
  };

  const startEditing = (challenge) => {
    setEditingId(challenge._id);
    setProgressValue(challenge.progress);
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Activities - EcoTrack</title>
      </Helmet>

      <div className="min-h-screen bg-base-200 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            My Activities & Progress
          </h1>

          {myChallenges.length === 0 ? (
            <div className="text-center p-12 bg-base-100 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-500">
                You haven't joined any challenges yet.
              </h2>
              <Link
                to="/challenges"
                className="btn btn-success text-white mt-6"
              >
                Browse Challenges
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full bg-base-100 shadow-lg">
                <thead className="text-base">
                  <tr>
                    <th>Challenge Title</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myChallenges.map((challenge) => (
                    <tr key={challenge._id} className="hover">
                      <td>
                        <div className="font-bold">
                          {challenge.challengeDetails.title}
                        </div>
                        <div className="text-sm opacity-50">
                          {challenge.challengeDetails.category}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            challenge.status === "Finished"
                              ? "badge-success"
                              : challenge.status === "Ongoing"
                              ? "badge-warning"
                              : "badge-ghost"
                          }`}
                        >
                          {challenge.status}
                        </span>
                      </td>
                      <td>
                        {editingId === challenge._id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={progressValue}
                              onChange={(e) =>
                                setProgressValue(Number(e.target.value))
                              }
                              className="range range-xs range-success"
                            />
                            <span className="font-bold">{progressValue}%</span>
                          </div>
                        ) : (
                          <progress
                            className="progress progress-success w-56"
                            value={challenge.progress}
                            max="100"
                          ></progress>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          {editingId === challenge._id ? (
                            <button
                              onClick={() =>
                                handleUpdateProgress(challenge._id)
                              }
                              className="btn btn-success btn-xs text-white"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => startEditing(challenge)}
                              className="btn btn-outline btn-info btn-xs"
                              disabled={challenge.status === "Finished"}
                            >
                              <FaEdit /> Update
                            </button>
                          )}

                          {challenge.status !== "Finished" &&
                            editingId !== challenge._id && (
                              <button
                                onClick={() => markAsFinished(challenge._id)}
                                className="btn btn-outline btn-success btn-xs"
                              >
                                <FaCheck /> Mark as Finished
                              </button>
                            )}

                          <button
                            onClick={() => handleDelete(challenge._id)}
                            className="btn btn-outline btn-error btn-xs"
                          >
                            <FaTrashAlt /> Leave
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyActivities;
