import { useEffect } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function Notifications() {
  const { notifications, loading, markAsRead, markAllAsRead } = useNotifications();

  useEffect(() => {
    document.title = "Notifications - YesAuction";
  }, []);

  if (loading && notifications.length === 0) {
    return <div className="text-center py-10">Loading notifications...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-blue-600 hover:underline text-sm"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`bg-white p-5 rounded-xl shadow-sm border-l-4 hover:shadow-md transition-all cursor-pointer
                ${!notif.isRead ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
            >
              <div className="flex justify-between">
                <div>
                  {notif.title && <h3 className="font-semibold">{notif.title}</h3>}
                  <p className="mt-1 text-gray-700">{notif.message}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                </span>
              </div>

              {notif.link && (
                <Link
                  to={notif.link}
                  className="text-blue-600 text-sm mt-3 inline-block hover:underline"
                >
                  View Details →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}