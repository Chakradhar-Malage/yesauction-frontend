import { Link } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  currentPrice: number | string;
}

const DashboardAuctionCard = ({ id, title, currentPrice }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      <p className="text-green-600 font-bold text-xl mb-4">
        ₹ {currentPrice}
      </p>

      <Link
        to={`/auction/${id}`}
        className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        View
      </Link>
    </div>
  );
};

export default DashboardAuctionCard;