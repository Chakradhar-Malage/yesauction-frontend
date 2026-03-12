import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function Navbar() {
  const { user } = useCurrentUser();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          YesAuction
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/auctions" className="hover:text-blue-600">
            Auctions
          </Link>

          {!user && (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="relative group">
              <button className="flex items-center gap-2 font-medium">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  {user.username.charAt(0).toUpperCase()}
                </div>

                {user.username}
              </button>

              {/* Dropdown */}

              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block">
                <Link
                  to={`/users/${user.username}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <Link
                  to="/my-bids"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Bids
                </Link>

                <Link
                  to="/my-auctions"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Auctions
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
