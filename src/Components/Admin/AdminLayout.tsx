import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import axiosClient from "../../api/axiosClient";

export default function AdminLayout() {
  const { user } = useCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user && !user.roles?.includes("ROLE_ADMIN")) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await axiosClient.get("/admin/contact-messages/unread-count");
        setUnreadCount(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUnread();
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Contact Messages", path: "/admin/contact-messages", badge: unreadCount },
    { name: "Users", path: "/admin/users" },
    { name: "Auctions", path: "/admin/auctions" },
    { name: "Badges", path: "/admin/badges" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-1">YesAuction</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{item.name}</span>
                {(item.badge ?? 0) > 0 && (
  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
    {item.badge}
  </span>
)}

              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Link
            to="/"
            className="block text-center text-sm text-gray-500 hover:text-blue-600"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}