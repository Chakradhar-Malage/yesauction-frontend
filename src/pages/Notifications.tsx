import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../hooks/useNotifications";
import { Notification } from "../types/Notification";

type FilterTab = "all" | "unread";

// ---- Type -> visual config -------------------------------------------------

const TYPE_CONFIG: Record<
  Notification["type"],
  { icon: string; iconBg: string; iconColor: string; label: string }
> = {
  OUTBID: {
    icon: "⚠️",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    label: "Outbid",
  },
  BID_PLACED: {
    icon: "🔨",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    label: "Bid Placed",
  },
  AUCTION_WON: {
    icon: "🏆",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    label: "Auction Won",
  },
  AUCTION_ENDED: {
    icon: "⏰",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    label: "Auction Ended",
  },
  SYSTEM: {
    icon: "🔔",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    label: "System",
  },
};

// ---- Helpers ----------------------------------------------------------------

function getDateGroup(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const diffDays = Math.round(
    (startOfDay(now) - startOfDay(date)) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return "This Week";
  return "Earlier";
}

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

const GROUP_ORDER = ["Today", "Yesterday", "This Week", "Earlier"];

// ---- Component ----------------------------------------------------------------

export default function Notifications() {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  useEffect(() => {
    document.title = "Notifications - YesAuction";
  }, []);

  const filtered = useMemo(() => {
    return activeTab === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;
  }, [notifications, activeTab]);

  const grouped = useMemo(() => {
    const groups: Record<string, Notification[]> = {};
    for (const n of filtered) {
      const key = getDateGroup(n.createdAt);
      if (!groups[key]) groups[key] = [];
      groups[key].push(n);
    }
    return GROUP_ORDER.filter((g) => groups[g]?.length).map((g) => ({
      label: g,
      items: groups[g],
    }));
  }, [filtered]);

  const handleClick = async (notif: Notification) => {
    if (!notif.read) {
      await markAsRead(notif.id);
    }
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const isInitialLoading = loading && notifications.length === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={markAllAsRead}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {(["all", "unread"] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px
              ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab === "all" ? "All" : "Unread"}
            {tab === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 bg-blue-100 text-blue-600 text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading skeleton */}
      {isInitialLoading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-gray-100 animate-pulse"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty states */}
      {!isInitialLoading && filtered.length === 0 && (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <div className="text-4xl mb-3">
            {activeTab === "unread" ? "✅" : "🔔"}
          </div>
          <p className="text-gray-500 text-lg">
            {activeTab === "unread"
              ? "You're all caught up!"
              : "No notifications yet"}
          </p>
          {activeTab === "unread" && (
            <p className="text-gray-400 text-sm mt-1">
              No unread notifications right now.
            </p>
          )}
        </div>
      )}

      {/* Grouped list */}
      {!isInitialLoading && filtered.length > 0 && (
        <div className="space-y-6">
          {grouped.map((group) => (
            <div key={group.label}>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">
                {group.label}
              </h2>
              <div className="space-y-3">
                {group.items.map((notif) => {
                  const config = TYPE_CONFIG[notif.type] ?? TYPE_CONFIG.SYSTEM;
                  return (
                    <div
                      key={notif.id}
                      onClick={() => handleClick(notif)}
                      className={`bg-white p-5 rounded-xl shadow-sm border-l-4 hover:shadow-md transition-all cursor-pointer
                        ${
                          !notif.read
                            ? "border-blue-500 bg-blue-50/60"
                            : "border-gray-200"
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${config.iconBg}`}
                        >
                          <span className={config.iconColor}>
                            {config.icon}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                {!notif.read && (
                                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                )}
                                <h3 className="font-semibold text-gray-900 truncate">
                                  {notif.title ?? config.label}
                                </h3>
                              </div>
                              <p className="mt-1 text-gray-700 text-sm break-words">
                                {notif.message}
                              </p>
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                              {getRelativeTime(notif.createdAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 mt-3">
                            {notif.link && (
                              <span className="text-blue-600 text-sm font-medium hover:underline">
                                View Details →
                              </span>
                            )}
                            {!notif.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notif.id);
                                }}
                                className="text-gray-400 text-sm hover:text-gray-600 hover:underline"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
