import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { FaUsers, FaClock, FaCalendarAlt, FaBullseye } from "react-icons/fa";

const ChallengeDetail = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/challenges/${id}`
        );
        setChallenge(response.data.data);
      } catch (err) {
        console.error("Failed to fetch challenge:", err);
        setError("Failed to load challenge data.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  if (!challenge) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{challenge?.title} - EcoTrack</title>
      </Helmet>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="card lg:card-side bg-base-100 shadow-xl border">
          <figure className="lg:w-1/2">
            <img
              src={challenge.imageUrl}
              alt={challenge.title}
              className="w-full h-[400px] object-cover"
            />
          </figure>
          <div className="card-body lg:w-1/2">
            <span className="badge badge-lg badge-success text-white font-semibold">
              {challenge.category}
            </span>
            <h1 className="card-title text-3xl font-bold mt-4">
              {challenge.title}
            </h1>
            <p className="mt-4 text-gray-600">{challenge.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-6 border-t pt-6">
              <div className="flex items-center gap-3">
                <FaClock className="text-success text-xl" />
                <div>
                  <span className="text-sm text-gray-500">Duration</span>
                  <p className="font-semibold">{challenge.duration} days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="text-success text-xl" />
                <div>
                  <span className="text-sm text-gray-500">Participants</span>
                  <p className="font-semibold">
                    {challenge.participants} Joined
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-success text-xl" />
                <div>
                  <span className="text-sm text-gray-500">Starts On</span>
                  <p className="font-semibold">
                    {formatDate(challenge.startDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaBullseye className="text-success text-xl" />
                <div>
                  <span className="text-sm text-gray-500">Target</span>
                  <p className="font-semibold">{challenge.target}</p>
                </div>
              </div>
            </div>

            <div className="card-actions justify-end mt-8">
              <Link
                to={`/challenges/join/${challenge._id}`}
                className="btn btn-success btn-lg text-white"
              >
                Join This Challenge
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChallengeDetail;
