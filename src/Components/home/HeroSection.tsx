import { useNavigate } from "react-router-dom";
import {useCurrentUser} from "../../hooks/useCurrentUser";

export default function HeroSection() {
  const navigate = useNavigate();
  const { user, loading } = useCurrentUser();

  const handleStartSelling = () => {
    if (loading) return;

    // Not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // Not verified
    if (!user.mobileNumberVerified) {
      navigate("/verify-mobile");
      return;
    }

    // All good
    navigate("/create-auction");
  };

  return (
    <section className="bg-gray-900 text-white py-24">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          Discover Rare Items & Win Auctions
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Bid on thousands of products in real-time auctions
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
            Explore Auctions
          </button>

          <button
            onClick={handleStartSelling}
            disabled={loading}
            className="bg-white text-black px-6 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Checking..." : "Start Selling"}
          </button>
        </div>
      </div>
    </section>
  );
}