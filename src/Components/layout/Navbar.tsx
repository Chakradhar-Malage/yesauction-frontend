import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useState, useRef, useEffect } from "react";
import { useNotifications } from "../../hooks/useNotifications";

export default function Navbar() {
  const { user } = useCurrentUser();
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/auctions?search=${trimmed}`);
    setMenuOpen(false);
  };

  const handleNotificationClick = (notif: any) => {
    markAsRead(notif.id);
    setNotificationsOpen(false);
    if (notif.link) {
      navigate(notif.link);
    } else {
      navigate("/notifications");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            YesAuction
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search auctions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border rounded-l-lg px-4 py-2 focus:outline-none"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700">
              Search
            </button>
          </form>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/auctions" className="hover:text-blue-600">Auctions</Link>

            {user && (
              <>
                <Link to="/watchlist" className="hover:text-blue-600">Watchlist</Link>

                {/* Notifications Dropdown */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setProfileOpen(false);
                    }}
                    className="absolute-right text-2xl hover:text-blue-600 relative"
                  >
                    🔔
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-xl z-50 max-h-[420px] overflow-hidden flex flex-col">
                      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold">Notifications</h3>
                        <Link to="/notifications" onClick={() => setNotificationsOpen(false)} className="text-blue-600 text-sm hover:underline">
                          View All
                        </Link>
                      </div>

                      <div className="overflow-y-auto flex-1">
                        {notifications.length > 0 ? (
                          notifications.slice(0, 5).map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => handleNotificationClick(notif)}
                              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notif.read ? "bg-blue-50" : ""}`}
                            >
                              <p className="text-sm">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(notif.createdAt).toLocaleString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500">No new notifications</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" className="hover:text-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}

            {/* Profile Dropdown */}
            {user && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.username}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-[-20] mt-3 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <Link to={`/users/${user.username}`} className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>
                      Profile
                    </Link>
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>
                      Dashboard
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

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 border-t pt-4">
            <Link to="/auctions">Auctions</Link>
            {user && (
              <>
                <Link to="/watchlist">Watchlist</Link>
                <Link to="/notifications">Notifications ({unreadCount})</Link>
              </>
            )}
            {/* ... other mobile links */}
          </div>
        )}
      </div>
    </nav>
  );
}