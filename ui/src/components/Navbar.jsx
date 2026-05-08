import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar({ setUser }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${search}`);
  };

  return (
    <header className="site-header">

      {/* TOP BAR */}
      <div className="topbar">
        <div className="steam-container">
          <span className="steam"></span>
          <span className="steam"></span>
          <span className="steam"></span>
        </div>

        <span className="topbar-tagline">
          Premium Coffee Experience ☕
        </span>

        <div className="topbar-right">
          {user && (
            <span className="nav-user">
              Hi, <strong>{user.username}</strong>
            </span>
          )}

          <Link to="/profile">My Account</Link>

          <button
            className="topbar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="navbar-main">

        {/* LOGO */}
        <Link to="/home" className="navbar-logo">
          ☕ Coffee<span>Shop</span>
        </Link>

        {/* SEARCH */}
        <form className="search-bar" onSubmit={handleSearch}>

          <input
            type="text"
            placeholder="Search coffee, pastries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <button type="submit" className="search-btn">
            🔍
          </button>

        </form>

        {/* ACTIONS */}
        <div className="navbar-actions">

          <Link to="/home" className="action-btn">
            <span>🏠</span>
            <p>Home</p>
          </Link>

          <Link to="/products" className="action-btn">
            <span>☕</span>
            <p>Products</p>
          </Link>

          <Link to="/cart" className="action-btn cart-btn">
            <span>🛒</span>
            <p>Cart</p>

            <div className="cart-badge">
              2
            </div>
          </Link>

          <Link to="/orders" className="action-btn">
            <span>📦</span>
            <p>Orders</p>
          </Link>

          <Link to="/messages" className="action-btn">
            <span>💬</span>
            <p>Messages</p>
          </Link>

        </div>
      </nav>

      {/* CATEGORY BAR */}
      <nav className="navbar-categories">

        <Link to="/products">All</Link>
        <Link to="/products?cat=espresso">Espresso</Link>
        <Link to="/products?cat=latte">Latte</Link>
        <Link to="/products?cat=tea">Tea</Link>
        <Link to="/products?cat=pastries">Pastries</Link>
        <Link to="/products?cat=beans">Beans</Link>
        <Link to="/products?cat=equipment">Equipment</Link>

      </nav>

    </header>
  );
}

export default Navbar;