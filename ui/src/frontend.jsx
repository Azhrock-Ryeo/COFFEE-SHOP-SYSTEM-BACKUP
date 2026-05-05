import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<h1>Home Page</h1>} />
        <Route path="/products" element={<h1>Products Page</h1>} />
        <Route path="/cart" element={<h1>Cart Page</h1>} />
        <Route path="/orders" element={<h1>Orders Page</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
        <Route path="/messages" element={<h1>Messages Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App