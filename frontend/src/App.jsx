import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BookingPage from './pages/Booking';
import QueuePage from './pages/Queue';
import EstimasiPage from './pages/Estimasi';
import DetailServisPage from './pages/DetailServis';
import AdminDashboard from './pages/AdminDashboard';
import AdminReport from './pages/AdminReport';
import AdminPelanggan from './pages/AdminPelanggan';
import AdminPengaturan from './pages/AdminPengaturan';
import AdminReview from './pages/AdminReview';
import { AuthProvider } from './context/AuthContext';
import { QueueProvider } from './context/QueueContext';
import { BookingProvider } from './context/BookingContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <QueueProvider>
        <BookingProvider>
          <NotificationProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes — wajib login */}
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
                <Route path="/queue" element={<ProtectedRoute><QueuePage /></ProtectedRoute>} />
                <Route path="/estimasi" element={<ProtectedRoute><EstimasiPage /></ProtectedRoute>} />
                <Route path="/servis/:id" element={<ProtectedRoute><DetailServisPage /></ProtectedRoute>} />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/laporan" element={<AdminRoute><AdminReport /></AdminRoute>} />
                <Route path="/admin/pelanggan" element={<AdminRoute><AdminPelanggan /></AdminRoute>} />
                <Route path="/admin/review" element={<AdminRoute><AdminReview /></AdminRoute>} />
                <Route path="/admin/pengaturan" element={<AdminRoute><AdminPengaturan /></AdminRoute>} />
              </Routes>
            </Router>
          </NotificationProvider>
        </BookingProvider>
      </QueueProvider>
    </AuthProvider>
  );
}

export default App;
