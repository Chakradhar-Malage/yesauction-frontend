import { useState } from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/layout/Navbar";

export default function VerifyMobile() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Send OTP
  const handleSendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setMessage("Enter valid 10-digit Indian mobile number");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post("/api/auth/send-otp", { phone });

      setStep("otp");
      setMessage("OTP sent successfully");
    } catch (err: any) {
      setMessage(err?.response?.data || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Enter OTP");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post("/api/auth/verify-otp", {
        phone,
        otp,
      });

      setMessage("Mobile verified 🎉");

      // redirect after success
      setTimeout(() => {
        navigate("/create-auction");
      }, 1000);
    } catch (err: any) {
      setMessage(err?.response?.data || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white text-gray-900 p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Verify Mobile Number
          </h2>

          {/* PHONE STEP */}
          {step === "phone" && (
            <>
              <div className="flex mb-4">
                <span className="px-3 flex items-center bg-gray-200 border border-r-0 rounded-l">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full border p-3 rounded-r"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500 mb-4 text-center">
                Currently available for Indian mobile numbers only (🇮🇳)
              </p>
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border p-3 rounded mb-4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={handleSendOtp}
                className="mt-3 text-sm text-blue-600"
              >
                Resend OTP
              </button>
            </>
          )}

          {/* MESSAGE */}
          {message && (
            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
