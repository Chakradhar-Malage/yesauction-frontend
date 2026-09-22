import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllAuctions,
  endAuction,
  deleteAuction,
} from "../api/auctionApis";

interface Auction {
  id: number;
  title: string;
  currentPrice: number;
  endTime: string;
  status: string;
  sellerUsername: string;
  imageUrl?: string;
}

export default function AdminAuctions() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const loadAuctions = async () => {
    try {
      setLoading(true);
      const data = await fetchAllAuctions();
      setAuctions(data);
    } catch (err) {
      console.error("Failed to fetch auctions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuctions();
  }, []);

  const handleForceEnd = async (id: number, title: string) => {
    if (!window.confirm(`Force end auction "${title}"?`)) return;

    try {
      setActionLoading(id);
      await endAuction(id);
      await loadAuctions();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to end auction");
    } finally {
      setActionLoading(null);
    }
  };

  const handleForceCancel = async (id: number, title: string) => {
    if (!window.confirm(`Delete auction "${title}"?`)) return;

    try {
      setActionLoading(id);
      await deleteAuction(id);
      await loadAuctions();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete auction");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading auctions...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Auctions Management</h1>
        <button
          onClick={loadAuctions}
          className="text-sm text-blue-600 hover:underline"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Title
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Seller
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Current Price
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                End Time
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {auctions.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No auctions found
                </td>
              </tr>
            ) : (
              auctions.map((auction) => (
                <tr key={auction.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{auction.id}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/auction/${auction.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {auction.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{auction.sellerUsername}</td>
                  <td className="px-6 py-4 font-semibold">
                    ₹ {auction.currentPrice}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        auction.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : auction.status === "ENDED"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {auction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(auction.endTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 space-x-3">
                    {auction.status === "ACTIVE" && (
                      <>
                        <button
                          onClick={() =>
                            handleForceEnd(auction.id, auction.title)
                          }
                          disabled={actionLoading === auction.id}
                          className="text-grey-600 hover:underline text-sm disabled:opacity-50"
                        >
                          {actionLoading === auction.id
                            ? "Processing..."
                            : "Force End"}
                        </button>
                        <button
                          onClick={() =>
                            handleForceCancel(auction.id, auction.title)
                          }
                          disabled={actionLoading === auction.id}
                          className="text-red-600 hover:underline text-sm disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
