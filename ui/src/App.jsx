import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import Navbar from "./components/Navbar";
import Login from "./login";
import Register from "./register";
import music from "./assets/music.mp3";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const audioRef = useRef(null);

  useEffect(() => {
    const enableAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.3; // ✅ 30% volume
          await audioRef.current.play();
        }
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

          {/* ADMIN */}
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;