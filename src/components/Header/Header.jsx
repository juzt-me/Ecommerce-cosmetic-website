import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import OfferBanner from "../OfferBanner/OfferBanner";
import "./Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log("Header - Current user:", user);
  console.log("Header - Is admin?", user?.isAdmin);

  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();
    window.addEventListener("storage", updateWishlistCount);
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("storage", updateWishlistCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <OfferBanner />
      <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-container">
              <img
                src="/logo-unicorn.png"
                alt="Aura Pop Beauty"
                className="logo-image"
              />
              <span className="logo-text">
                <span className="gradient-text logo-line">Aura Pop</span>
                <span className="gradient-text logo-line">Beauty</span>
              </span>
            </div>
          </Link>

          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            {user?.isAdmin ? (
              <Link to="/admin" className="nav-link admin-link">
                Admin Dashboard
              </Link>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/about" className="nav-link">
                  About
                </Link>
                <Link to="/products" className="nav-link">
                  Products
                </Link>
                <Link to="/skincare" className="nav-link">
                  Skincare
                </Link>
                <Link to="/flash-sales" className="nav-link">
                  Flash Sales
                </Link>
                <Link to="/rewards" className="nav-link">
                  Rewards
                </Link>
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
              </>
            )}
          </nav>

          <div className="header-actions">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                🔍
              </button>
            </form>

            <Link to="/wishlist" className="wishlist-link">
              ❤️
              {wishlistCount > 0 && (
                <span className="wishlist-badge">{wishlistCount}</span>
              )}
            </Link>

            <Link to="/cart" className="cart-link">
              🛒
              {getCartItemsCount() > 0 && (
                <span className="cart-badge">{getCartItemsCount()}</span>
              )}
            </Link>

            {user ? (
              <div className="user-menu">
                <span className="user-name">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/signin" className="btn btn-secondary signin-btn">
                Sign In
              </Link>
            )}

            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
