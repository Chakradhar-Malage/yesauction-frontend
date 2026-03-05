import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/layout/Layout";
import AuctionList from "./pages/AuctionList";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    // <BrowserRouter>
      <Layout>
        <Routes>

          <Route path="/" element={<AuctionList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>

      </Layout>

    // </BrowserRouter>
  );
}

export default App;