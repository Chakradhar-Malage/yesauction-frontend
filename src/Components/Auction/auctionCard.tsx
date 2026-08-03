import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clock, Pencil, Trash2 } from "lucide-react";
import useCountdown from "../../hooks/useCountdown";
import { watchlistApi } from "../../api/watchlistApis";
import axiosClient from "../../api/axiosClient";

import { Heart } from "lucide-react";

interface Props {
  id: number;
  title: string;
  description?: string;
  currentPrice: number | string;
  endTime: string;
  imageUrl?: string | null;
  showActions?: boolean;
  isWatched?: boolean;
  onWatchToggle?: () => void; // Optional callback
  onDeleted?: (id: number) => void; // Optional callback, fired after a successful delete
}

export default function AuctionCard({
  id,
  title,
  description = "",
  currentPrice,
  endTime,
  imageUrl,
  showActions = false,
  // isWatched = false,
  onWatchToggle,
  onDeleted,
}: Props) {
  const navigate = useNavigate();
  const [isWatched, setIsWatched] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await watchlistApi.checkWatchlistStatus(id);
        setIsWatched(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    checkStatus();
  }, [id]);

  const toggleWatch = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isWatched) {
        await watchlistApi.removeFromWatchlist(id);
      } else {
        await watchlistApi.addToWatchlist(id);
      }
      setIsWatched(!isWatched);
    } catch (err) {
      console.error("Failed to toggle watchlist", err);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit-auction/${id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      `Delete "${title}"? This can't be undone.`
    );
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

  const getImageSrc = () => {
    if (!imageUrl) return "/placeholder.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    return `http://localhost:8081/uploads/${imageUrl}`;
  };

  return (
    <Link to={`/auction/${id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col relative">

        {/* Watchlist Heart */}
       <button
          onClick={toggleWatch}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Heart 
            className={`w-6 h-6 transition-colors ${isWatched ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
          />
        </button>

        {/* Image */}
        <img
          src={getImageSrc()}
          alt={title}
          className="h-40 w-full object-cover rounded-lg mb-4"
        />

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        {/* Price */}
        <p className="text-green-600 font-bold text-lg mb-1">
          ₹ {currentPrice}
        </p>

        {/* Countdown */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Clock className="w-4 h-4 text-orange-500" />
          <span>{useCountdown(endTime)}</span>
        </div>

        <div className="mt-auto w-full bg-blue-600 text-white py-2.5 rounded-lg text-center hover:bg-blue-700 transition-colors font-medium">
          View Auction
        </div>

        {/* Owner Actions */}
        {showActions && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleEdit}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}