import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import NotFound from './Components/NotFound';

import ProductDetails from './Components/ProductDetails'; // <-- fixed import

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main className="p-4">
          <Routes>
            <Route path='/' element={<ProductList />} /> 
            <Route path="/product" element={<ProductList />} /> 
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
