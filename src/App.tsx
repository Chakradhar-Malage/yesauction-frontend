import { Routes, Route, Link } from 'react-router-dom';
import AuctionDetail from './pages/AuctionDetail'; // adjust path if needed

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Simple header / navigation */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">YesAuction</h1>
          <nav className="mt-2">
            <Link to="/" className="mr-4 hover:underline">Home</Link>
            <Link to="/auction/1" className="hover:underline">Test Auction #1</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-6 px-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center py-10">
                <h2 className="text-3xl font-bold mb-4">Welcome to YesAuction</h2>
                <p className="text-lg mb-6">
                  This is a real-time auction platform.
                </p>
                <Link
                  to="/auction/1"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Go to Test Auction #1
                </Link>
              </div>
            }
          />

          <Route path="/auction/:id" element={<AuctionDetail />} />
          
          {/* Fallback for unknown routes */}
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;