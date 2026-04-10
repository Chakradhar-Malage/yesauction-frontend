import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import axiosClient from "../api/axiosClient";
import { updateProfile } from "../api/profileApis";

export default function EditProfile() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // Pre-fill form
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Email regex
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    let newErrors = { username: "", email: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await updateProfile(formData);

      alert("Profile updated successfully!");
      navigate("/users/me");
    } catch (err: any) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to update profile";

      if (message.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: message }));
      } else if (message.toLowerCase().includes("username")) {
        setErrors((prev) => ({ ...prev, username: message }));
      } else {
        alert(message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-6"
      >
        {/* Username */}
        <div>
          <label className="block mb-2 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.username
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
