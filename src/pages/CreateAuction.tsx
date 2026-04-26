import { useState } from "react";
import { useCreateAuction } from "../hooks/useCreateAuction";
import { useNavigate } from "react-router-dom";

const CreateAuction = () => {
  const { submitAuction, loading } = useCreateAuction();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startingPrice: "",
    endTime: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await submitAuction({
      ...form,
      startingPrice: Number(form.startingPrice),
    });

    navigate("/my-auctions");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Create Auction
        </h1>
        <p className="text-gray-500 mb-8">
          Fill in the details to start your auction
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Auction Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Vintage Watch"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your item..."
              rows={4}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Price + Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Starting Price (₹)
              </label>
              <input
                type="number"
                name="startingPrice"
                value={form.startingPrice}
                onChange={handleChange}
                placeholder="1000"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="datetime-local"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition 
              ${loading 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
              }`}
          >
            {loading ? "Creating Auction..." : "Create Auction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;