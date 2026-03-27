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
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Create Auction</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        <input
          type="text"
          name="title"
          placeholder="Auction Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows={4}
          required
        />

        <input
          type="number"
          name="startingPrice"
          placeholder="Starting Price"
          value={form.startingPrice}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="datetime-local"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded w-full"
        >
          {loading ? "Creating..." : "Create Auction"}
        </button>
      </form>
    </div>
  );
};

export default CreateAuction;