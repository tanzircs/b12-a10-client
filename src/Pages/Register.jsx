import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';



const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (value) => {
    if (value.length < 6) return "Password must be at least 6 characters.";
    if (!/[a-z]/.test(value)) return "Must include a lowercase letter.";
    if (!/[A-Z]/.test(value)) return "Must include an uppercase letter.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return "Must include a special character.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = validatePassword(password);
    if (msg) {
      setError(msg);
      return;
    }

    setError("");
    setLoading(true);


    setTimeout(() => {
      setLoading(false);
      navigate("/", { replace: true });
    }, 1000);
  };

  const handleGoogleRegister = () => {
    console.log("Google Register Clicked");
  };
    
    return (
      <div className="max-w-md mx-auto mt-16 px-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Join EcoTrack
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

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

          <div>
            <label className="block mb-1 text-sm">Photo URL</label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="w-full mt-4 border py-2 rounded flex justify-center hover:bg-gray-50 transition"
        >
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    );
};

export default Register;