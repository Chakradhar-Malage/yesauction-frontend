import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function ContactUs() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(5);

  // Countdown + Redirect
  useEffect(() => {
    if (!success) return;

    if (countdown === 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [success, countdown, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axiosClient.post("/contact", form);
      setSuccess(true);
      setCountdown(5);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Contact Us</h1>
        <p className="text-center text-gray-500 mb-8">
          Have questions? We'd love to hear from you.
        </p>

        {success ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4"></div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              Message Sent Successfully!
            </h2>
            <p className="text-gray-600">
              Redirecting to homepage in{" "}
              <span className="font-bold text-blue-600">{countdown}</span> seconds...
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Keep your existing form fields here */}
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}