import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FaUsers, FaClock } from "react-icons/fa";

const ActiveChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/challenges?limit=6"
        );
        setChallenges(response.data.data);
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 mt-20">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Active Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg shadow-sm h-96 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-0 mt-20">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Active Challenges
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge._id}
            className="card bg-base-100 shadow-xl border overflow-hidden"
          >
            <figure className="h-56">
              <img
                src={challenge.imageUrl}
                alt={challenge.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-5">
              <span className="text-sm font-medium text-green-600">
                {challenge.category}
              </span>
              <h3 className="card-title text-lg font-bold mt-1">
                {challenge.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {challenge.description.substring(0, 100)}...
              </p>

              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <FaClock /> {challenge.duration} days
                </span>
                <span className="flex items-center gap-2">
                  <FaUsers /> {challenge.participants} Joined
                </span>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/challenges/${challenge._id}`}
                  className="btn btn-sm btn-outline btn-success"
                >
                  View Challenge
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveChallenges;
