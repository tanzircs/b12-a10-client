import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { FaUsers, FaClock, FaSearch, FaPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Context/AuthContext";

const AllChallenges = () => {
  const { user } = useContext(AuthContext);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minParticipants, setMinParticipants] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(1000);

  const challengeCategories = [
    "Waste Reduction",
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
  ];

  const fetchChallenges = async (queryParams = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://b12-a10-server.vercel.app/api/challenges",
        {
          params: queryParams,
        }
      );
      setChallenges(response.data.data);
    } catch (error) {
      console.error("Failed to fetch challenges:", error);
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (categories.length > 0) params.category = categories.join(",");
    if (startDate) params.startDateFrom = startDate.toISOString();
    if (endDate) params.startDateTo = endDate.toISOString();
    if (minParticipants > 0) params.minParticipants = minParticipants;
    if (maxParticipants < 1000) params.maxParticipants = maxParticipants;
    fetchChallenges(params);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setCategories([...categories, value]);
    else setCategories(categories.filter((cat) => cat !== value));
  };

  const clearFilters = () => {
    setCategories([]);
    setStartDate(null);
    setEndDate(null);
    setMinParticipants(0);
    setMaxParticipants(1000);
    fetchChallenges();
  };

  return (
    <>
      <Helmet>
        <title>Browse Challenges - EcoTrack</title>
      </Helmet>

      <div className="bg-base-200 p-8">
        <div className="max-w-[1440px] mx-auto items-center text-center md:flex md:justify-between md:text-left mb-8">
          <h1 className="text-3xl font-bold">Browse All Challenges</h1>
          {user && (
            <Link
              to="/challenges/add"
              className="btn btn-success text-white mt-4 md:mt-0"
            >
              <FaPlus /> Add New Challenge
            </Link>
          )}
        </div>

        <form
          onSubmit={handleFilterSubmit}
          className="max-w-[1440px] mx-auto bg-base-100 p-6 rounded-lg shadow-md mb-8 "
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
            <div className="form-control col-span-1 md:col-span-3 lg:col-span-2">
              <label className="label">
                <span className="label-text font-semibold">
                  Filter by Category
                </span>
              </label>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {challengeCategories.map((cat) => (
                  <label
                    key={cat}
                    className="cursor-pointer label justify-start gap-2"
                  >
                    <input
                      type="checkbox"
                      value={cat}
                      checked={categories.includes(cat)}
                      onChange={handleCategoryChange}
                      className="checkbox checkbox-success checkbox-sm"
                    />
                    <span className="label-text">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Date Range</span>
              </label>
              <div className="flex gap-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="input input-bordered w-full"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Participants Range
                </span>
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={minParticipants}
                  onChange={(e) => setMinParticipants(Number(e.target.value))}
                  className="input input-bordered w-full"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(Number(e.target.value))}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-success text-white">
                <FaSearch /> Filter
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="btn btn-ghost"
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-0 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-lg shadow-sm h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge._id}
                className="card bg-base-100 shadow-xl border overflow-hidden"
              >
                <figure className="h-56">
                  <img
                    src={challenge.imageUrl || "/placeholder.png"}
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
        )}
        {!loading && challenges.length === 0 && (
          <div className="text-center col-span-full">
            <h3 className="text-2xl font-semibold text-gray-500">
              No challenges found matching your criteria.
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default AllChallenges;
