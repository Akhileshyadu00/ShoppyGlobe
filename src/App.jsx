import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy imports
const Header = lazy(() => import('./Components/Header'));
const Footer = lazy(() => import('./Components/Footer'));
const Home = lazy(() => import('./Components/Home'));
const ProductList = lazy(() => import('./Components/ProductList'));
const ProductDetails = lazy(() => import('./Components/ProductDetails'));
const Cart = lazy(() => import('./Components/Cart'));
//const NotFound = lazy(() => import('./Components/NotFound'));

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Static (non-lazy) Components */}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />

        {/* Lazy-loaded Layout & Pages */}
        <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
          <Header />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
           {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
