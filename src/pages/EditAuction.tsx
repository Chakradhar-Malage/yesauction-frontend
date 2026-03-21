import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAuctionById, updateAuction } from "../api/auctionApis";

interface AuctionForm {
  title: string;
  description: string;
  currentPrice: number;
  endTime: string;
}

export default function EditAuction() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<AuctionForm>({
    title: "",
    description: "",
    currentPrice: 0,
    endTime: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch auction data
  useEffect(() => {
    if (!id) return;

    const fetchAuction = async () => {
      try {
        const data = await fetchAuctionById(Number(id));

        setForm({
          title: data.title,
          description: data.description,
          currentPrice: data.currentPrice,
          endTime: data.endTime.slice(0, 16), // for datetime-local input
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load auction");
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "currentPrice"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  // Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    setUpdating(true);

    try {
      await updateAuction(Number(id), form);
      alert("Auction updated successfully");

      navigate("/my-auctions"); // redirect after update
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  // Loading UI
  if (loading) {
    return <p className="text-center mt-10">Loading auction...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Auction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Current Price</label>
          <input
            type="number"
            name="currentPrice"
            value={form.currentPrice}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <input
            type="datetime-local"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={updating}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {updating ? "Updating..." : "Update Auction"}
        </button>
      </form>
    </div>
  );
}