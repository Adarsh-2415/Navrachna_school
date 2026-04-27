import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import Login from './components/admin/Login.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
import Dashboard from './components/admin/Dashboard.jsx'
import Inquiries from './components/admin/Inquiries.jsx'
import GalleryAdmin from './components/admin/GalleryAdmin.jsx'
import AnnouncementsAdmin from './components/admin/AnnouncementsAdmin.jsx'
import AboutAdmin from './components/admin/AboutAdmin.jsx'
import PagesAdmin from './components/admin/PagesAdmin.jsx'
import DisclosuresAdmin from './components/admin/DisclosuresAdmin.jsx'
import FeeAdmin from './components/admin/FeeAdmin.jsx'
import HolidayAdmin from './components/admin/HolidayAdmin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          } 
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="announcements" element={<AnnouncementsAdmin />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="pages" element={<PagesAdmin />} />
          <Route path="disclosures" element={<DisclosuresAdmin />} />
        </Route>
        
        {/* Main Public Website Route */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
