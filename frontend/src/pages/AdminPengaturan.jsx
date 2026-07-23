import React, { useState, useEffect } from 'react';
import { AdminSidebar, AdminHeader } from '../components/admin';
import { API_BASE_URL } from '../config/api';
import { Toast, QuotaCalendar, GlobalCapacityCard } from '../components/admin-pengaturan';

const AdminPengaturan = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({});
  const [dirty, setDirty] = useState({});

  const showToast = (message, type = 'success') => setToast({ message, type });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/settings`);
      const data = await res.json();
      if (data.code === 200) {
        setSettings(data.data);
        const init = {};
        data.data.forEach(s => { init[s.key] = s.value; });
        setForm(init);
        setDirty({});
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleChange = (key, value) => {
    setForm(p => ({ ...p, [key]: value }));
    setDirty(p => ({ ...p, [key]: true }));
  };

  const handleSave = async (key) => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/settings/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ value: form[key] }),
      });
      const data = await res.json();
      if (data.code === 200) { setDirty(p => ({ ...p, [key]: false })); showToast('Pengaturan berhasil disimpan!'); }
      else showToast(data.message || 'Gagal menyimpan.', 'error');
    } catch { showToast('Gagal terhubung ke server.', 'error'); }
    finally { setSaving(false); }
  };

  const handleReset = (key) => {
    const orig = settings.find(s => s.key === key);
    if (orig) { setForm(p => ({ ...p, [key]: orig.value })); setDirty(p => ({ ...p, [key]: false })); }
  };

  const defaultQuota = parseInt(form['max_antrian_per_hari']) || 20;

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans text-gray-200 selection:bg-yellow-400/30">
      <AdminSidebar activeMenu="pengaturan" />

      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        <AdminHeader title="PENGATURAN ANTRIAN">
        </AdminHeader>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 z-10 custom-scrollbar">
          <div className="max-w-[1400px] w-full mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-10 h-10 border-4 border-gray-800 border-t-yellow-400 rounded-full animate-spin" />
                <span className="text-[12px] font-bold text-gray-500 uppercase tracking-widest animate-pulse">Memuat Konfigurasi...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-5 animate-[slideIn_0.4s_ease-out] items-start">
                <div className="xl:col-span-4 space-y-4">
                  {settings.filter(s => s.key === 'max_antrian_per_hari').map(setting => (
                    <GlobalCapacityCard
                      key={setting.key}
                      setting={setting}
                      currentVal={form[setting.key] ?? setting.value}
                      isChanged={!!dirty[setting.key]}
                      saving={saving}
                      onChange={handleChange}
                      onSave={handleSave}
                      onReset={handleReset}
                    />
                  ))}
                </div>

                <div className="xl:col-span-8">
                  <QuotaCalendar defaultQuota={defaultQuota} showToast={showToast} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #262626;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #404040;
        }
      `}</style>
    </div>
  );
};

export default AdminPengaturan;
