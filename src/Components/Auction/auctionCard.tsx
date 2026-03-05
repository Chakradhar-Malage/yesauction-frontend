interface Props {
  title: string
  description: string
  currentPrice: String
  endTime: string
}

export default function AuctionCard({ title, description, currentPrice, endTime }: Props) {

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">

      <img
        src="https://via.placeholder.com/300"
        className="rounded-lg mb-4"
      />

      <h3 className="text-xl font-bold mb-2">{title}</h3>

      <p className="text-gray-500 mb-4">{description}</p>

      <div className="text-green-600 font-bold text-lg mb-2">
        ₹{currentPrice}
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Ends: {endTime}
      </p>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
        View Auction
      </button>

    </div>
  )
}