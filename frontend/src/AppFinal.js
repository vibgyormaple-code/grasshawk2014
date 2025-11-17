import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import EnhancedAbout from "./components/EnhancedAbout";
import Contact from "./components/Contact";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Pricing from "./components/Pricing";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Success from "./components/success";
import Cancel from "./components/cancel";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import CertificateAndTrust from "./components/CertificateAndTrust";
import { translations } from "./utils/translations";
import "./styles/EnhancedStyles.css";
import "./styles/ResponsiveLayout.css";
import "./styles/AppFinalStyles.css";

// Scroll reveal animation hook
const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en'); // Language state: 'en' or 'fr'

  console.log('AppFinal component loaded');

  useScrollReveal();

  useEffect(() => {
    // Simulate loading for animation purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.name === product.name);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (name) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  const updateQuantity = (name, amount) => {
    setCartItems(
      cartItems.map((item) =>
        item.name === name
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  if (isLoading) {
    return (
      <div className="flex-center" style={{ height: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p style={{ color: "white", marginTop: "20px", fontSize: "1.2rem" }}>Loading amazing experience...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <div className="app-container">
          <Navbar 
            cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} 
            language={language}
            setLanguage={setLanguage}
          />
          <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <Hero language={language} />
                <Footer language={language} />
              </div>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/contact" element={
            <div>
              <Contact language={language} />
              <Footer language={language} />
            </div>
          } />
          <Route path="/about" element={
            <div>
              <About language={language} />
              <Footer language={language} />
            </div>
          } />
          <Route path="/products" element={
            <div>
              <Products addToCart={addToCart} language={language} />
              <Footer language={language} />
            </div>
          } />
          <Route path="/pricing" element={
            <div>
              <Pricing language={language} />
              <Footer language={language} />
            </div>
          } />
          <Route path="/testimonials" element={
            <div>
              <Testimonials language={language} />
              <Footer language={language} />
            </div>
          } />
          <Route path="/certificate-trust" element={
            <div>
              <CertificateAndTrust language={language} />
              <Footer language={language} />
            </div>
          } />
        </Routes>
        </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
