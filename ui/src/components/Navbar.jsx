import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>☕ Coffee Shop</div>
      <div style={styles.links}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/orders" style={styles.link}>Orders</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/messages" style={styles.link}>Messages</Link>
        <button style={styles.logout}>Logout</button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3b2a1a',
    padding: '10px 30px',
    color: 'white'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#f5c842'
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px'
  },
  logout: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer'
  }
}

export default Navbar