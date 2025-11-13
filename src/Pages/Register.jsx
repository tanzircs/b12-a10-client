import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

import { toast } from "react-toastify";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[!@#$%^&*()_+]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      setLoading(false);
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);

      toast.success("Registration Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to register");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Google Login Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Google login failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Join EcoTrack</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col w-full max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Join EcoTrack</h1>
          </div>
          <div className="card w-full shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                              </label>
                              <br />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                              </label>
                              <br />
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-14 top-9 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {passwordError && (
                <div className="text-red-500 text-sm mt-2">{passwordError}</div>
              )}

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-success text-white w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>

            <div className="divider px-8">OR</div>

            <div className="card-body pt-0">
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline"
                disabled={loading}
              >
                <FaGoogle className="text-red-500" />
                Register with Google
              </button>
            </div>

            <p className="text-center pb-6">
              Already have an account?{" "}
              <Link to="/login" className="link link-success font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
