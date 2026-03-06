interface Props {
  title: string
  description: string
  currentPrice: number
  endTime: string
}

export default function AuctionCard({ title, description, currentPrice, endTime }: Props) {

  return (
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

      <p className="text-sm text-gray-500 mb-4">
        Ends: {new Date(endTime).toLocaleString()}
      </p>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        View Auction
      </button>

    </div>
  );
}