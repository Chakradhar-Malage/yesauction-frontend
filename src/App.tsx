import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/layout/Layout";
import Home from "./pages/Home";
import AuctionList from "./pages/AuctionList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuctionDetail from "./pages/AuctionDetail";
import Profile from "./pages/Profile";
import VerifyMobile from "./pages/VerifyMobileNumber";
import CreateAuction from "./pages/CreateAuction";
import MyAuctions from "./pages/MyAuctions";
import MyBids from "./pages/MyBids";
import EditAuction from "./pages/EditAuction";
import SellerDashboard from "./pages/SellerDashboard";
import EditProfile from "./pages/EditProfile";
import Notifications from "./pages/Notifications";
import Watchlist from "./pages/Watchlist";
import ContactUs from "./pages/ContactUs";
import AdminContactMessages from "./pages/AdminContactMessages";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProtectedRoute from "./Components/Admin/AdminProtectedRoute";
import AdminUsers from "./pages/AdminUsers";
import AdminAuctions from "./pages/AdminAuctions";
import Help from "./pages/Help";
import WonAuctions from "./pages/WonAuctions";
import ProtectedRoute from "./Components/Auth/ProtectedRoute"; // ← Add this

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== Public routes with Layout ========== */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auctions" element={<AuctionList />} />
          <Route path="/auction/:id" element={<AuctionDetail />} />
          <Route path="/users/:username" element={<Profile />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/help" element={<Help />} />

          {/* ========== Protected routes (require login) ========== */}
          <Route element={<ProtectedRoute />}>
            <Route path="/create-auction" element={<CreateAuction />} />
            <Route path="/my-auctions" element={<MyAuctions />} />
            <Route path="/my-bids" element={<MyBids />} />
            <Route path="/edit-auction/:id" element={<EditAuction />} />
            <Route path="/dashboard" element={<SellerDashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/won-auctions" element={<WonAuctions />} />
          </Route>

          {/* ========== Admin routes ========== */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="auctions" element={<AdminAuctions />} />
            <Route path="contact-messages" element={<AdminContactMessages />} />
          </Route>
        </Route>

        {/* ========== Public routes WITHOUT Layout ========== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protect verify-mobile as well */}
        <Route element={<ProtectedRoute />}>
          <Route path="/verify-mobile" element={<VerifyMobile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;