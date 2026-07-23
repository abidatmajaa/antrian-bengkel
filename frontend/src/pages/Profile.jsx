import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar, Footer } from '../components/home-page';
import { API_BASE_URL } from '../config/api';
import { ProfileUserCard, ProfileHistory } from '../components/profile';

const Profile = () => {
  const { user, logout, authHeader } = useAuth();
  const navigate = useNavigate();
  const [antrians, setAntrians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAntrians = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/antrian/my`, {
          headers: authHeader(),
        });
        const data = await res.json();
        if (res.ok) {
          setAntrians(data.data);
        } else {
          setError(data.message || 'Gagal mengambil data riwayat.');
        }
      } catch (e) {
        setError('Gagal terhubung ke server.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAntrians();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#060606] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <Navbar />

      <div className="max-w-3xl mx-auto px-5 md:px-8 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-2">Akun Saya</p>
          <h1 className="font-bebas text-[48px] md:text-[56px] text-white tracking-wide leading-none">PROFIL</h1>
        </div>

        <ProfileUserCard user={user} handleLogout={handleLogout} antrians={antrians} />
        <ProfileHistory isLoading={isLoading} error={error} antrians={antrians} navigate={navigate} />
      </div>

      <div className="pb-8" />
      <Footer />
    </div>
  );
};

export default Profile;
