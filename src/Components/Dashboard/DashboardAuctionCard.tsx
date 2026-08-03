import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import axiosClient from "../../api/axiosClient";

interface Props {
  id: number;
  title: string;
  currentPrice: number | string;
  onDeleted?: (id: number) => void;
}

const DashboardAuctionCard = ({ id, title, currentPrice, onDeleted }: Props) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleEdit = () => navigate(`/edit-auction/${id}`);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${title}"? This can't be undone.`);
    if (!confirmed) return;

    try {
      setDeleting(true);
      await axiosClient.delete(`/auctions/${id}`);
      onDeleted?.(id);
    } catch (err: any) {
      console.error("Failed to delete auction", err);
      alert(
        err.response?.data ||
          "Couldn't delete this auction. It may already have bids."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      <p className="text-green-600 font-bold text-xl mb-4">
        ₹ {currentPrice}
      </p>

      <div className="flex gap-2">
        <Link
          to={`/auction/${id}`}
          className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          View
        </Link>
        <button
          onClick={handleEdit}
          title="Edit"
          className="p-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          title="Delete"
          className="p-2 rounded border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DashboardAuctionCard;