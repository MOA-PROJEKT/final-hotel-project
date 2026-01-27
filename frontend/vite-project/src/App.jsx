// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// ✅ NEW
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Restaurant from "./pages/Restaurant";
import Wellness from "./pages/Wellness";
import Gallery from "./pages/Gallery";
import Kontakt from "./pages/Kontakt";
import NotFound from "./pages/NotFound";
import MyBookings from "./pages/MyBookings";

// NEW
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/auth/AdminRoute";
import RoomDetails from "./pages/RoomDetails";
import Danke from "./pages/Danke";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";

import DeluxeDoppelzimmer from "./pages/DeluxeDoppelzimmer";
import JuniorSuiteMedium from "./pages/JuniorSuiteMedium";

import DeluxeSuite from "./pages/DeluxeSuite";
import TwinJuniorSuite from "./pages/TwinJuniorSuite";
import JuniorSuiteLarge from "./pages/JuniorSuiteLarge";
import CornerJuniorSuite from "./pages/CornerJuniorSuite";
import GrandSuite from "./pages/GrandSuite";
import PenthouseSuite from "./pages/PenthouseSuite";

import Profile from "./pages/Profile";

export default function App() {
  const location = useLocation();
  const path = location.pathname;

  const hideNavbar = path === "/login" || path === "/danke";
  const hideFooter =
    path === "/my-bookings" ||
    path === "/admin" ||
    path === "/login" ||
    path === "/danke";

  return (
    <>
      {!hideNavbar && <Navbar />}

      {/* ✅ sorgt dafür, dass jede neue Seite oben startet */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Kontakt />} />
        <Route path="/danke" element={<Danke />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/impressum" element={<Impressum />} />

        <Route path="/login" element={<Login />} />

        <Route path="/rooms/deluxe-doppelzimmer" element={<DeluxeDoppelzimmer />} />
        <Route path="/zimmer/junior-suite-medium" element={<JuniorSuiteMedium />} />

        <Route path="/zimmer/deluxe-suite" element={<DeluxeSuite />} />
        <Route path="/zimmer/twin-junior-suite" element={<TwinJuniorSuite />} />
        <Route path="/zimmer/junior-suite-large" element={<JuniorSuiteLarge />} />
        <Route path="/zimmer/corner-junior-suite" element={<CornerJuniorSuite />} />
        <Route path="/zimmer/grand-suite" element={<GrandSuite />} />
        <Route path="/zimmer/penthouse-suite" element={<PenthouseSuite />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}
