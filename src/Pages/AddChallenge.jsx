import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddChallenge = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();

  const challengeCategories = [
    "Waste Reduction",
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const newChallenge = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      duration: parseInt(form.duration.value),
      target: form.target.value,
      impactMetric: form.impactMetric.value,
      imageUrl: form.imageUrl.value,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      createdBy: user.email,
      participants: 0,
    };

    try {
      await axiosSecure.post("/api/challenges", newChallenge);
      Swal.fire({
        title: "Success!",
        text: "New challenge added successfully!",
        icon: "success",
        timer: 1500,
      });
      navigate("/challenges");
    } catch (err) {
      console.error("Failed to add challenge:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to add challenge. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add New Challenge - EcoTrack</title>
      </Helmet>

      <div className="min-h-screen bg-base-200 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Add a New Challenge
          </h1>

          <div className="card bg-base-100 shadow-xl border">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Challenge Title
                    </span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Plastic-Free July"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <select
                    name="category"
                    className="select select-bordered"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {challengeCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control col-span-1 md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Description
                    </span>
                  </label>
                  <textarea
                    name="description"
                    className="textarea textarea-bordered h-24"
                    placeholder="Brief description of the challenge..."
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Duration (in days)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="duration"
                    placeholder="e.g., 30"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Target</span>
                  </label>
                  <input
                    type="text"
                    name="target"
                    placeholder="e.g., Reduce plastic waste"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Impact Metric
                    </span>
                  </label>
                  <input
                    type="text"
                    name="impactMetric"
                    placeholder="e.g., kg plastic saved"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control col-span-1 md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">Image URL</span>
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Start Date</span>
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">End Date</span>
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="form-control mt-8">
                <button
                  type="submit"
                  className="btn btn-success text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Add Challenge"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChallenge;
