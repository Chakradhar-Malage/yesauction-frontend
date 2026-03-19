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


function App() {
  return (
    <BrowserRouter>

      <Layout>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/auctions" element={<AuctionList />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/auction/:id" element={<AuctionDetail />} />

          <Route path="/users/:username" element={<Profile />} />

          <Route path="/verify-mobile" element={<VerifyMobile />} />

          <Route path="/create-auction" element={<CreateAuction />} />
          
          <Route path="/my-auctions" element={<MyAuctions />} />

          <Route path="/my-bids" element={<MyBids />} />

        </Routes>

      </Layout>

    </BrowserRouter>
  );
}

export default App;