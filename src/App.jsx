import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import NotFound from './Components/NotFound';

import ProductDetails from './Components/ProductDetails'; // <-- fixed import
import Home from './Components/Home';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main className="p-4">
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path="/product" element={<ProductList />} /> 
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
