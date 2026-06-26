import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAuctionById, updateAuction, updateAuctionImage } from "../api/auctionApis";

interface AuctionForm {
  title: string;
  description: string;
  endTime: string;
}

export default function EditAuction() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<AuctionForm>({
    title: "",
    description: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e.target.files && e.target.files[0]) {
    setImageFile(e.target.files[0]);
  }
};

  useEffect(() => {
    if (!id) return;

    const loadAuction = async () => {
      try {
        const data = await fetchAuctionById(Number(id));

        setForm({
          title: data.title || "",
          description: data.description || "",
          endTime: data.endTime
            ? data.endTime.slice(0, 16)
            : "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load auction");
      } finally {
        setLoading(false);
      }
    };

    loadAuction();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    setUpdating(true);

    try {
      console.log("Submitting:", form);

      // await updateAuction(Number(id), form);
      
      // alert("Auction updated successfully");

      await updateAuction(Number(id), form);

      // Upload image only if user selected one
      if (imageFile) {
        await updateAuctionImage(Number(id), imageFile);
      }

      alert("Auction updated successfully");
      navigate("/my-auctions");
    } catch (err: any) {
      console.error(err);

      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Update failed";

      alert(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg">
        Loading auction...
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Edit Auction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">
            Title
          </label>
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
          <label className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Auction Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />

          {imageFile && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {imageFile.name}
            </p>
          )}
        </div>
        {/* End Time */}
        <div>
          <label className="block mb-1 font-medium">
            End Time
          </label>
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {updating ? "Updating..." : "Update Auction"}
        </button>
      </form>
    </div>
  );
}