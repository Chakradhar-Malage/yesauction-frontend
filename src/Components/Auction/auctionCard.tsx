import { Link } from "react-router-dom";
import useCountdown from "../../hooks/useCountdown";
import { deleteAuction } from "../../api/auctionApis";

interface Props {
  id: number;
  title: string;
  description: string;
  currentPrice: number | string;
  endTime: string;
  showActions?: boolean;
  status?: string; //
  image?: string;
}

export default function AuctionCard({
  id,
  title,
  description,
  currentPrice,
  endTime,
  image,
  showActions = false,
}: Props) {

  const getImageSrc = () => {
    if (!image) return "/placeholder.png";

    if (image.startsWith("http")) return image;

    return `http://localhost:8080/uploads/${image}`;
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent Link click
    e.preventDefault();

    const confirmDelete = window.confirm("Delete this auction?");
    if (!confirmDelete) return;

    try {
      await deleteAuction(id);
      alert("Auction deleted");

      window.location.reload(); // can optimize later
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <Link to={`/auction/${id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">

        {/* Image placeholder */}
        <img
          src={getImageSrc()}
          alt={title}
          className="h-40 w-full object-cover rounded-lg mb-4"
        />

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <p className="text-green-600 font-bold text-lg mb-1">
          ₹ {currentPrice}
        </p>

        {/* Countdown (from old UI ) */}
        <p className="text-sm mb-3">
          ⏳ {useCountdown(endTime)}
        </p>

        {/* View Button */}
        <div className="w-full bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700">
          View Auction
        </div>

        {/* ACTIONS (ONLY FOR OWNER) */}
        {showActions && (
          <div
            className="flex gap-2 mt-3"
            onClick={(e) => e.preventDefault()} // prevent parent link navigation
          >
            <Link
              to={`/edit-auction/${id}`}
              className="flex-1 text-center bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}

      </div>
    </Link>
  );
}