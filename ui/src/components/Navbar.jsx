import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ setUser }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null) // ← this triggers App to re-render
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">☕ Coffee Shop</div>
      <div className="navbar-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/cart" className="nav-link">🛒 Cart</Link>
        <Link to="/orders" className="nav-link">Orders</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/messages" className="nav-link">💬 Messages</Link>
        {user && <span className="nav-user">Hi, {user.username}!</span>}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar