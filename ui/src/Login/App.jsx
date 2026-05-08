import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useEffect } from "react";
import Navbar from './components/Navbar'
import Login from "./Login";
import Register from "./Register";
import music from "./assets/music.mp3";

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const enableAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log("Waiting for user interaction...");
      }
    };

    // trigger on ANY click in the page
    const handleUserInteraction = () => {
      enableAudio();
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);
 const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')))
  return (
    <BrowserRouter>
      {/* GLOBAL MUSIC */}
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mpeg" />
      </audio>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={user ? <><Navbar setUser={setUser} /><h1>Home</h1></> : <Navigate to="/login" />} />
        <Route path="/products" element={user ? <><Navbar setUser={setUser} /><h1>Products</h1></> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <><Navbar setUser={setUser} /><h1>Cart</h1></> : <Navigate to="/login" />} />
        <Route path="/orders" element={user ? <><Navbar setUser={setUser} /><h1>Orders</h1></> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <><Navbar setUser={setUser} /><h1>Profile</h1></> : <Navigate to="/login" />} />
        <Route path="/messages" element={user ? <><Navbar setUser={setUser} /><h1>Messages</h1></> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;