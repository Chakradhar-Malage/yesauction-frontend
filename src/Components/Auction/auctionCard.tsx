import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import useCountdown from "../../hooks/useCountdown";
import { watchlistApi } from "../../api/watchlistApis";

import { Heart } from "lucide-react";

interface Props {
  id: number;
  title: string;
  description?: string;
  currentPrice: number | string;
  endTime: string;
  imageUrl?: string | null;
  showActions?: boolean;
}

export default function AuctionCard({
  id,
  title,
  description = "",
  currentPrice,
  endTime,
  imageUrl,
  showActions = false,
}: Props) {

  const [isWatched, setIsWatched] = useState(false); // Will be controlled from parent if needed

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
            {/* Add your edit/delete buttons here */}
          </div>
        )}
      </div>
    </Link>
  );
}