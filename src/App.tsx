import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/layout/Layout";
import Home from "./pages/Home";
import AuctionList from "./pages/AuctionList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuctionDetail from "./pages/AuctionDetail";
// import AuctionDetails from "./Components/Auction/auctionDetails";

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

        </Routes>

      </Layout>

    </BrowserRouter>
  );
}

export default App;