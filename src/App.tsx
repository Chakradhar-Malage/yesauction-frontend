import { Routes, Route, Link } from 'react-router-dom'
import AuctionList from './pages/AuctionList'
import AuctionDetail from './pages/AuctionDetail'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">YesAuction</Link>
          <div className="space-x-6">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4">
        <Routes>
          <Route path="/" element={<AuctionList />} />
          <Route path="/auctions/:id" element={<AuctionDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App