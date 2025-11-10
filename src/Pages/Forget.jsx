import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Forget = () => {

const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);


  setTimeout(() => {
    setLoading(false);
    setMessage("Password reset link sent to your email.");
    setTimeout(() => navigate("/login", { replace: true }), 1000);
  }, 1000);
};

    return (
      <div className="max-w-md mx-auto mt-20 px-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h1>

        {message && (
          <p className="text-green-600 text-sm mb-3 text-center">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    );
};

export default Forget;