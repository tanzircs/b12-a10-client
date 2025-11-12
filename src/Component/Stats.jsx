import React, { useEffect, useState } from "react";
import axios from "axios";

const Stats = () => {
  const [stats, setStats] = useState({
    totalCo2Saved: 0,
    totalPlasticReduced: 0,
    totalParticipants: 0,
    totalChallenges: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/stats/community"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const data = [
    { label: "Total CO₂ Saved", value: `${stats.totalCo2Saved || 0} kg` },
    { label: "Total Impact", value: `${stats.totalImpact || 0}` },
    { label: "Active Participants", value: stats.totalParticipants },
    { label: "Challenges Running", value: stats.totalChallenges },
  ];

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-xl shadow-sm h-24 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl shadow-sm p-5 flex flex-col items-center"
        >
          <span className="text-sm text-gray-500">{item.label}</span>
          <span className="text-2xl font-semibold mt-1 text-gray-900">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
