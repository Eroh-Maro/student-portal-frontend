import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import "aos/dist/aos.css";
import AOS from "aos";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <AuthProvider>
      <div className="appContainer">
        <Navbar />
        <ScrollToTop behavior="auto" />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;