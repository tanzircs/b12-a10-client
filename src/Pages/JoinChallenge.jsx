import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FaUsers, FaClock, FaCheckCircle } from "react-icons/fa";

const JoinChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://b12-a10-server.vercel.app/api/challenges/${id}`
        );
        setChallenge(response.data.data);
      } catch (err) {
        console.error("Failed to fetch challenge:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleJoinChallenge = async () => {
    setIsJoining(true);
    try {
      await axios.post(
        `https://b12-a10-server.vercel.app/api/challenges/join/${id}`,
        {
          userId: user.uid,
          email: user.email,
          joinDate: new Date().toISOString(),
        }
      );

      toast.success("Successfully joined the challenge!");
      navigate("/my-activities");
    } catch (err) {
      console.error("Failed to join challenge:", err);
      toast.error(err.response?.data?.message || "Failed to join challenge.");
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">
          Challenge not found.
        </h2>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Join: {challenge?.title} - EcoTrack</title>
      </Helmet>

      <div className="min-h-screen bg-base-200 p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold">Confirm Your Participation</h1>
          <p className="py-6">
            You are about to join the challenge:
            <span className="font-bold text-success"> "{challenge.title}"</span>
          </p>
        </div>

        <div className="max-w-3xl mx-auto card bg-base-100 shadow-xl border">
          <div className="card-body p-8">
            <h2 className="card-title text-2xl">{challenge.title}</h2>
            <span className="badge badge-success text-white font-semibold my-2">
              {challenge.category}
            </span>
            <p className="text-gray-600 mt-2">{challenge.description}</p>
            <div className="flex gap-6 mt-4 border-t pt-4">
              <span className="flex items-center gap-2">
                <FaClock className="text-success" /> {challenge.duration} days
              </span>
              <span className="flex items-center gap-2">
                <FaUsers className="text-success" /> {challenge.participants}{" "}
                Joined
              </span>
            </div>

            <div className="card-actions justify-center mt-8">
              <button
                onClick={handleJoinChallenge}
                className="btn btn-success btn-lg text-white"
                disabled={isJoining}
              >
                {isJoining ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <FaCheckCircle />
                    Confirm & Join
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinChallenge;
