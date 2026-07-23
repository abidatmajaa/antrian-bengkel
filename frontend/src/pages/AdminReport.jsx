import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar, AdminHeader } from '../components/admin';
import { API_BASE_URL } from '../config/api';
import { MetricCards, HistoryTable, ModalNota } from '../components/admin-report';


const AdminReport = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    totalRevenue: 0,
    totalFinished: 0,
    avgRevenue: 0,
    history: []
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('daily');
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAntrian, setSelectedAntrian] = useState(null);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const url = filter === 'custom'
        ? `${API_BASE_URL}/antrian/report?filter=custom&date=${customDate}`
        : `${API_BASE_URL}/antrian/report?filter=${filter}`;

      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.code === 200) {
        setReportData(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [filter, customDate]);

  const openNotaModal = (antrian) => {
    setSelectedAntrian(antrian);
    setIsModalOpen(true);
  };

  const getFilterTitle = () => {
    switch (filter) {
      case 'daily': return 'Hari Ini';
      case 'weekly': return 'Minggu Ini';
      case 'monthly': return 'Bulan Ini';
      case 'custom': return new Date(customDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      default: return 'Semua Waktu';
    }
  };

  const formatRupiah = (angka) => {
    if (!angka) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9] overflow-hidden font-sans">
      <AdminSidebar activeMenu="laporan" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <AdminHeader title="LAPORAN BENGKEL">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Filter Data:</span>
            {filter === 'custom' && (
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:border-emerald-500 shadow-sm"
              />
            )}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-gray-100 border border-gray-200 rounded text-sm font-bold text-gray-700 outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="daily">Hari Ini</option>
              <option value="weekly">Minggu Ini</option>
              <option value="monthly">Bulan Ini</option>
              <option value="custom">Pilih Tanggal</option>
              <option value="all">Semua Waktu</option>
            </select>
          </div>
        </AdminHeader>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">

          <MetricCards reportData={reportData} getFilterTitle={getFilterTitle} formatRupiah={formatRupiah} />

          <HistoryTable reportData={reportData} loading={loading} openNotaModal={openNotaModal} formatRupiah={formatRupiah} />
        </main>
      </div>

      <ModalNota
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedAntrian={selectedAntrian}
        formatRupiah={formatRupiah}
      />

    </div>
  );
};

export default AdminReport;
