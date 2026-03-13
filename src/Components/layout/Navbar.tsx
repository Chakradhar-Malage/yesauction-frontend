import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { user } = useCurrentUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* TOP ROW */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            YesAuction
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search auctions..."
              className="w-full border rounded-l-lg px-4 py-2 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700">
              Search
            </button>
          </div>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/auctions" className="hover:text-blue-600">
              Auctions
            </Link>

            {user && (
              <>
                {/* Watchlist */}
                <Link to="/watchlist" className="hover:text-blue-600">
                  Watchlist
                </Link>

                {/* Notifications */}
                <Link
                  to="/notifications"
                  className="text-xl hover:text-blue-600"
                >
                  🔔
                </Link>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" className="hover:text-blue-600">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}

            {/* PROFILE DROPDOWN */}
            {user && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>

                  <span>{user.username}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg overflow-hidden">
                    <Link
                      to={`/users/${user.username}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      to="/my-auctions"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Auctions
                    </Link>

                    <Link
                      to="/my-bids"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Bids
                    </Link>

                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE SEARCH */}
        <div className="mt-4 md:hidden">
          <input
            type="text"
            placeholder="Search auctions..."
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 border-t pt-4">
            <Link to="/auctions">Auctions</Link>

            {!user && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}

            {user && (
              <>
                <Link to={`/users/${user.username}`}>Profile</Link>
                <Link to="/my-auctions">My Auctions</Link>
                <Link to="/my-bids">My Bids</Link>
                <Link to="/watchlist">Watchlist</Link>
                <Link to="/notifications">Notifications</Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
