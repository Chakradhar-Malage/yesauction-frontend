import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Profile() {
  const { user } = useCurrentUser();

  if (!user) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-6">

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
          {user.username?.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-500">{user.email}</p>
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
            {user.role}
          </span>
        </div>

        {/* Edit Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <p className="text-gray-500">My Auctions</p>
          <h2 className="text-2xl font-bold mt-2">--</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <p className="text-gray-500">My Bids</p>
          <h2 className="text-2xl font-bold mt-2">--</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <p className="text-gray-500">Active Auctions</p>
          <h2 className="text-2xl font-bold mt-2">--</h2>
        </div>

      </div>

      {/* DETAILS SECTION */}
      <div className="bg-white shadow rounded-xl p-6 mt-8">

        <h2 className="text-xl font-semibold mb-4">Account Details</h2>

        <div className="space-y-3">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

      </div>

    </div>
  );
}