import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Home from "./pages/Home";
import Detection from "./pages/Detection";

function AppContent() {
  const location = useLocation();
  
  // Define which pages are dashboards
  const isDashboard = location.pathname === "/detection" || location.pathname === "/statistics";

  return (
    /* 
       LOGIC:
       1. For Home: Standard min-h-screen (always scrollable).
       2. For Dashboards: 
          - On Laptop (lg): h-screen overflow-hidden (Fitted/No scroll)
          - On Mobile: min-h-screen overflow-y-auto (Allows scrolling)
    */
    <div className={`flex flex-col w-full bg-white ${
      isDashboard 
        ? "lg:h-screen lg:overflow-hidden min-h-screen overflow-y-auto" 
        : "min-h-screen overflow-y-auto"
    }`}>
      
      <Navbar />

      {/* lg:flex-1 min-h-0 ensures the dashboard fits perfectly between Nav and Footer on Desktop */}
      <main className={`relative ${isDashboard ? "lg:flex-1 lg:min-h-0" : "w-full grow"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detection" element={<Detection />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;