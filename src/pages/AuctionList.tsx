import { useEffect, useState, useMemo } from "react";
import AuctionCard from "../Components/Auction/auctionCard";
import Navbar from "../Components/layout/Navbar";
import { useSearchParams } from "react-router-dom";
import { fetchAuctions, fetchAuctionsByCategory } from "../api/auctionApis";

interface Auction {
  id: number;
  title: string;
  description: string;
  currentPrice: number;
  endTime: string;
  status: string;
  category: string;
  imageUrl?: string | null;
}

const categories = [
  { label: "Watches", value: "WATCHES" },
  { label: "Jewelry", value: "JEWELRY" },
  { label: "Art", value: "ART" },
  { label: "Electronics", value: "ELECTRONICS" },
  { label: "Real Estate", value: "REAL_ESTATE" },
  { label: "Collectibles", value: "COLLECTIBLES" },
  { label: "Vehicles", value: "VEHICLES" },
  { label: "Fashion", value: "FASHION" },
  { label: "Antiques", value: "ANTIQUES" },
  { label: "Other", value: "OTHER" },
];

export default function AuctionList() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  // Safely extract selected categories using useMemo
  const selectedCategories = useMemo(() => {
    try {
      return searchParams.getAll("category") || [];
    } catch {
      return [];
    }
  }, [searchParams]);

  const token = localStorage.getItem("token");
  const isGuest = !token;

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        setLoading(true);
        setError(null);

        let data: Auction[];

        if (selectedCategories.length > 0) {
          data = await fetchAuctionsByCategory(selectedCategories);
        } else {
          data = await fetchAuctions();
        }

        setAuctions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load auctions:", err);
        setError("Failed to load auctions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadAuctions();
  }, [selectedCategories]);

  const visibleAuctions = isGuest ? auctions.slice(0, 3) : auctions;

  const toggleCategory = (categoryValue: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (selectedCategories.includes(categoryValue)) {
      const remaining = selectedCategories.filter((cat) => cat !== categoryValue);
      newParams.delete("category");
      remaining.forEach((cat) => newParams.append("category", cat));
    } else {
      newParams.append("category", categoryValue);
    }

    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("category");
    setSearchParams(newParams);
  };

  const hasActiveFilters = selectedCategories.length > 0;

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading auctions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
        {/* LEFT FILTER PANEL */}
        <div className="w-64 bg-white shadow-md rounded-xl p-6 h-fit sticky top-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-500 hover:text-red-600 font-medium underline"
              >
                Clear All
              </button>
            )}
          </div>

          <p className="mb-3 font-medium text-gray-700">Category</p>

          <div className="space-y-2.5">
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat.value);

              return (
                <label
                  key={cat.value}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    onClick={() => toggleCategory(cat.value)}
                    className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center
                      transition-all duration-200 flex-shrink-0 cursor-pointer
                      ${isSelected
                        ? "bg-green-500 border-green-500"
                        : "border-gray-400 group-hover:border-green-500"
                      }
                    `}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  <span
                    className={`transition-colors ${
                      isSelected
                        ? "text-green-600 font-semibold"
                        : "text-gray-700 group-hover:text-green-600"
                    }`}
                  >
                    {cat.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold">
              {hasActiveFilters
                ? `${selectedCategories.join(", ")} Auctions`
                : "Live Auctions"}
            </h1>

            {hasActiveFilters && (
              <div className="text-sm text-gray-500">
                {selectedCategories.length} category{selectedCategories.length > 1 ? "ies" : ""} selected
              </div>
            )}
          </div>

          {isGuest && auctions.length > 3 && (
            <p className="mb-4 text-sm text-gray-500">
              Showing limited auctions. Login to see all.
            </p>
          )}

          {visibleAuctions.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No auctions found for the selected {hasActiveFilters ? "categories" : "filters"}.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleAuctions.map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}