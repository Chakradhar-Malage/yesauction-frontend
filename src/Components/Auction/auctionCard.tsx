import useCountdown from "../../hooks/useCountdown";
import { Link } from "react-router-dom";

interface Props {
  id: number
  title: string
  description: string
  currentPrice: number
  endTime: string
}

export default function AuctionCard({ id, title, description, currentPrice, endTime }: Props) {

  return (
    <Link to={`/auction/${id}`}>
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">

      <div className="h-40 bg-gray-200 rounded-lg mb-4" />

      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>

      <p className="text-green-600 font-bold text-lg">
        {description}
      </p>

      <p className="text-green-600 font-bold text-lg">
        Rs. {currentPrice}
      </p>

      <p>
        ⏳ {useCountdown(endTime)}
      </p>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        View Auction
      </button>

    </div>
    </Link>
  );
}