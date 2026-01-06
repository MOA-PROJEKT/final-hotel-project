// src/App.jsx
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Pages
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Restaurant from './pages/Restaurant'
import Wellness from './pages/Wellness'
import Gallery from './pages/Gallery'
import Kontakt from './pages/Kontakt'
import NotFound from './pages/NotFound'

// NEW
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import AdminRoute from './components/auth/AdminRoute'



export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Kontakt />} />

        {/* NEW */}
        <Route path="/login" element={<Login />} />
              <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

        <Route path="*" element={<NotFound />} />

  


      </Routes>

      <Footer />
    </>
  )
}
