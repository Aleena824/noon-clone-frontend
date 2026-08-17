import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Common Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import AdminPanel from './pages/AdminPanel'; 
import AdminRoute from './components/AdminRoute'; 

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

// Import Global Styles
import './styles/global.css';
import './styles/rtl.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="app-container">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
  
            {/* Admin Protected Route */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminPanel/>
              </AdminRoute>
            } />

            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;