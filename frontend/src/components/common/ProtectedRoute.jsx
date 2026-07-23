import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute — Hanya mengizinkan akses jika user sudah login.
 *
 * Cara pakai di App.jsx:
 *   <Route path="/approval" element={<ProtectedRoute><ApprovalPage /></ProtectedRoute>} />
 *
 * Jika belum login, user akan diarahkan ke /login dan setelah berhasil
 * login akan dikembalikan ke halaman yang semula dituju (via state.from).
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Tunggu sampai auth selesai dicek (validasi token dari localStorage)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Memeriksa sesi login...</p>
        </div>
      </div>
    );
  }

  // Jika belum login, redirect ke /login
  // Simpan halaman asal di state agar bisa dikembalikan setelah login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
