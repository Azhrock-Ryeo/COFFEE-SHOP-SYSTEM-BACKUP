import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useEffect } from "react";

import Login from "./Login";
import Register from "./Register";
import music from "./assets/music.mp3";

function App() {
  const audioRef = useRef(null);

  // try to auto-play once when app loads
  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
      } catch (err) {
        console.log("Autoplay blocked, waiting for user interaction");
      }
    };

    playAudio();
  }, []);

  return (
    <BrowserRouter>
      {/* GLOBAL MUSIC (never reloads between pages) */}
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mpeg" />
      </audio>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;