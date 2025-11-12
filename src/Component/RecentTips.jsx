import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp, FaUserCircle } from "react-icons/fa";

const RecentTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/tips?limit=5&sort=createdAt"
        );
        setTips(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 mt-20">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Recent Community Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg shadow-sm h-48 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 mt-20">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Recent Community Tips
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div key={tip._id} className="card bg-base-100 shadow-xl border p-6">
            <h3 className="card-title text-lg font-bold">{tip.title}</h3>

            <p className="text-gray-600 text-sm mt-3">
              {tip.content.substring(0, 120)}...
            </p>

            <div className="flex justify-between items-center mt-6 border-t pt-4">
              <div className="flex items-center gap-2 text-sm">
                <FaUserCircle className="text-gray-400" size={20} />
                <span className="font-medium">{tip.authorName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <FaThumbsUp />
                <span>{tip.upvotes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTips;
