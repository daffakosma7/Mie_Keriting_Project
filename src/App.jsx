import Home from "./pages/user_pages/Home";
import Bakso from "./pages/user_pages/Bakso";
import Mie from "./pages/user_pages/Mie";
import Checkout from "./pages/user_pages/Checkout";

import Orders from "./pages/admin_pages/Orders";
import Menus from "./pages/admin_pages/Menus";
import Login from "./pages/admin_pages/Login";
import Register from "./pages/admin_pages/Register";
import Menu_Form from "./pages/admin_pages/Menu_Form";
import View_Order from "./pages/admin_pages/View_Order";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartDataProvider } from "./context/CartDataContext";

function App() {
  return (
    <CartDataProvider>
      <BrowserRouter>
        <Routes>
          {/* ADMIN ROUTE - Protected Routes */}
          <Route path="/admin" element={<Navigate to="/orders" />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menuform/:id" element={<Menu_Form />} />
          <Route path="/menuform" element={<Menu_Form />} />
          <Route path="/vieworder/:id" element={<View_Order />} />

          {/* USER ROUTE */}
          <Route path="/" element={<Home />} />
          <Route path="/bakso" element={<Bakso />} />
          <Route path="/mie" element={<Mie />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartDataProvider>
  );
}

export default App;
