import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({
        username,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/login");

    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-12">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Register
      </h2>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block text-gray-700">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded mt-1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
          Register
        </button>

      </form>

    </div>
  );
}