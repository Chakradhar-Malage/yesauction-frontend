import { Link } from "react-router-dom";
import { Clock } from "lucide-react"; // ← Proper icon library
import useCountdown from "../../hooks/useCountdown";
import { deleteAuction } from "../../api/auctionApis";

interface Props {
  id: number;
  title: string;
  description: string;
  currentPrice: number | string;
  endTime: string;
  showActions?: boolean;
  status?: string;
  imageUrl?: string | null;
}

export default function AuctionCard({
  id,
  title,
  description,
  currentPrice,
  endTime,
  imageUrl,
  showActions = false,
}: Props) {

  const getImageSrc = () => {
    if (!imageUrl) return "/placeholder.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    return `http://localhost:8081/uploads/${imageUrl}`;
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const confirmDelete = window.confirm("Delete this auction?");
    if (!confirmDelete) return;

    try {
      await deleteAuction(id);
      alert("Auction deleted");
      window.location.reload(); // TODO: Better state management later
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <Link to={`/auction/${id}`} className="block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col">

        {/* Image */}
        <img
          src={getImageSrc()}
          alt={title}
          className="h-40 w-full object-cover rounded-lg mb-4"
        />

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description - Now limited to 1 line with ellipsis */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-1 flex-1">
          {description}
        </p>

        {/* Price */}
        <p className="text-green-600 font-bold text-lg mb-1">
          ₹ {currentPrice}
        </p>

        {/* Countdown with Proper Icon */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Clock className="w-4 h-4 text-orange-500" />
          <span>{useCountdown(endTime)}</span>
        </div>

        {/* View Button */}
        <div className="mt-auto w-full bg-blue-600 text-white py-2.5 rounded-lg text-center hover:bg-blue-700 transition-colors font-medium">
          View Auction
        </div>

        {/* Owner Actions */}
        {showActions && (
          <div
            className="flex gap-2 mt-3"
            onClick={(e) => e.preventDefault()}
          >
            <Link
              to={`/edit-auction/${id}`}
              className="flex-1 text-center bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}