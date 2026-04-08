import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useMyAuctions } from "../hooks/useMyAuctions";
import { useMyBids } from "../hooks/useMyBids";

function StatCard({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="bg-white shadow-sm border rounded-xl p-5 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <h2 className="text-2xl font-semibold mt-1">
        {value ?? "—"}
      </h2>
    </div>
  );
}

function Avatar({ username }: { username: string | undefined }) {
  const initial = username?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-semibold">
      {initial}
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading } = useCurrentUser();
  const { auctions } = useMyAuctions();
  const { bids } = useMyBids();

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 animate-pulse">
        <div className="h-32 bg-gray-200 rounded-xl mb-6" />
        <div className="grid grid-cols-3 gap-6">
          <div className="h-24 bg-gray-200 rounded-xl" />
          <div className="h-24 bg-gray-200 rounded-xl" />
          <div className="h-24 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">
        Unable to load profile.
      </div>
    );
  }

  // derive stats properly
  const myAuctionsCount = auctions?.length ?? 0;
  const myBidsCount = bids?.length ?? 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      {/* HEADER */}
      <div className="bg-white border shadow-sm rounded-xl p-6 flex items-center gap-6">
        <Avatar username={user.username} />

        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {user.username}
          </h1>
          <p className="text-gray-500 text-sm">{user.email}</p>

          <span className="inline-block mt-2 text-xs bg-gray-100 px-3 py-1 rounded-full">
            {user.role}
          </span>

          {!user.mobileNumberVerified && (
            <p className="text-xs text-red-500 mt-1">
              Mobile number not verified
            </p>
          )}
        </div>

        <button className="text-sm border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => navigate("/edit-profile")}
        >
          Edit
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="My Auctions" value={myAuctionsCount} />
        <StatCard label="My Bids" value={myBidsCount} />
        <StatCard label="Active Auctions" value={myAuctionsCount} />
      </div>

      {/* DETAILS */}
      <div className="bg-white border shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Account Details</h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Username</p>
            <p className="font-medium">{user.username}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Role</p>
            <p className="font-medium">{user.role}</p>
          </div>

          <div>
            <p className="text-gray-500">Mobile Verified</p>
            <p className="font-medium">
              {user.mobileNumberVerified ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}