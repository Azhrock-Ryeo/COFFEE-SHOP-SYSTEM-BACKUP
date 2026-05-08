import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import Navbar from "./components/Navbar";
import Login from "./login";
import Register from "./register";
import music from "./assets/music.mp3";

function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const audioRef = useRef(null);

  useEffect(() => {
    const enableAudio = async () => {
      try {
        await audioRef.current?.play();
      } catch (err) {
        console.log("Waiting for user interaction...");
      }
    };

    const handleUserInteraction = () => {
      enableAudio();
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return (
    <>
      {/* GLOBAL MUSIC */}
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mpeg" />
      </audio>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/login"
            element={
              user ? <Navigate to="/home" /> : <Login setUser={setUser} />
            }
          />

          <Route
            path="/register"
            element={
              user ? <Navigate to="/home" /> : <Register setUser={setUser} />
            }
          />

          <Route
            path="/home"
            element={
              user ? (
                <>
                  <Navbar setUser={setUser} />
                  <h1>Home</h1>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/products"
            element={
              user ? (
                <>
                  <Navbar setUser={setUser} />
                  <h1>Products</h1>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/cart"
            element={
              user ? (
                <>
                  <Navbar setUser={setUser} />
                  <h1>Cart</h1>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/orders"
            element={
              user ? (
                <>
                  <Navbar setUser={setUser} />
                  <h1>Orders</h1>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/profile"
            element={
              user ? (
                <>
                  <Navbar setUser={setUser} />
                  <h1>Profile</h1>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/messages"
            element={
              user ? (
                <>
                  <Navbar setUser={setUser} />
                  <h1>Messages</h1>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;