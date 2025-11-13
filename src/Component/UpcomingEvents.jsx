import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/events?limit=4&sort=date"
        );
        setEvents(response.data.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 mt-20">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg shadow-sm h-64 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 mt-20">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="card bg-base-100 shadow-xl border p-5"
          >
            <h3 className="card-title text-lg font-bold">{event.title}</h3>
            <p className="text-gray-600 text-sm mt-2 flex-grow">
              {event.description.substring(0, 100)}...
            </p>

            <div className="mt-4 border-t pt-4 space-y-2">
              <span className="flex items-center gap-2 text-sm text-gray-700">
                <FaCalendarAlt className="text-green-600" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-2 text-sm text-gray-700">
                <FaMapMarkerAlt className="text-green-600" />
                {event.location}
              </span>
            </div>

            <div className="card-actions justify-end mt-4">
              <button className="btn btn-sm btn-outline btn-success">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
