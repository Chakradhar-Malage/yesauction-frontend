import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold text-blue-600">
          YesAuction
        </Link>

        <div className="flex gap-8 font-medium">

          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/auctions" className="hover:text-blue-600">
            Auctions
          </Link>

          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}