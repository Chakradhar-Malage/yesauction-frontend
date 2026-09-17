export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-3xl font-bold mt-2">—</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Active Auctions</h3>
          <p className="text-3xl font-bold mt-2">—</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Unread Messages</h3>
          <p className="text-3xl font-bold mt-2">—</p>
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a
            href="/admin/contact-messages"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Contact Messages
          </a>
        </div>
      </div>
    </div>
  );
}