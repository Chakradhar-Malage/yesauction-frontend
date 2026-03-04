import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Auction {
  id: number
  item: { title: string; description: string }
  currentPrice: string
  endTime: string
}

export default function AuctionList() {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8081/api/auctions')
      .then(res => {
        setAuctions(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  if (loading) return <div className="text-center py-10">Loading auctions...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Active Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map(auction => (
          <div key={auction.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{auction.item.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{auction.item.description}</p>
            <p className="text-lg mb-2">
              Current Bid: <span className="font-bold text-green-600">${auction.currentPrice}</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Ends: {new Date(auction.endTime).toLocaleString()}
            </p>
            <Link
              to={`/auctions/${auction.id}`}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              View & Bid
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}