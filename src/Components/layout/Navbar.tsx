import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white shadow">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            YesAuction
          </Link>

          {/* SEARCH */}
          <div className="hidden md:flex w-1/2">

            <input
              type="text"
              placeholder="Search auctions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-l-lg px-4 py-2 focus:outline-none"
            />

            <button className="bg-blue-600 text-white px-6 rounded-r-lg">
              Search
            </button>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            <Link
              to="/auctions"
              className="text-gray-700 hover:text-blue-600"
            >
              Auctions
            </Link>

            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}

            {isLoggedIn && (
              <Link
                to="/profile"
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                Profile
              </Link>
            )}

          </div>

        </div>
      </div>

    </header>
  );
}