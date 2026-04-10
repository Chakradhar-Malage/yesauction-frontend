import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const Sidebar = () => {
  const { user } = useCurrentUser();
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 space-y-6">
      <h2 className="text-2xl font-bold">Seller Panel</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/my-auctions" className="hover:text-yellow-400">
          My Auctions
        </Link>

        <Link to="/create-auction" className="hover:text-yellow-400">
          Create Auction
        </Link>

        <Link to="/my-bids" className="hover:text-yellow-400">
          My Bids
        </Link>

        {user && (
          <Link to={`/users/${user.username}`} className="hover:text-yellow-400">
            Profile
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;