import React, { useState, useEffect } from 'react';
import { Plus, MagnifyingGlass } from '@phosphor-icons/react';
import { AdminSidebar, AdminHeader } from '../components/admin';
import { UserFormModal, HistoryModal, SummaryCards, UserTable } from '../components/admin-pelanggan';
import { API_BASE_URL } from '../config/api';


// ─── Main Page ─────────────────────────────────────────────────────────────────
const AdminPelanggan = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (data.code === 200) setUsers(data.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (user) => {
    if (!window.confirm(`Hapus akun pelanggan "${user.name}" secara permanen?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (data.code === 200) fetchUsers();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const openAdd = () => { setEditData(null); setFormModalOpen(true); };
  const openEdit = (user) => { setEditData(user); setFormModalOpen(true); };
  const openHistory = (user) => { setSelectedUser(user); setHistoryModalOpen(true); };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f4f6f9] overflow-hidden font-sans">
      <AdminSidebar activeMenu="pelanggan" />

      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <AdminHeader title="DATA PELANGGAN">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded text-sm text-gray-700 outline-none focus:border-emerald-500 w-56 transition-colors"
            />
          </div>
          {/* Tambah */}
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Plus size={16} weight="bold" />
            Tambah Pelanggan
          </button>
        </AdminHeader>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">

          <SummaryCards usersLength={users.length} filteredLength={filtered.length} />
          
          <UserTable 
            filtered={filtered} 
            loading={loading} 
            search={search} 
            openHistory={openHistory} 
            openEdit={openEdit} 
            handleDelete={handleDelete} 
          />
        </main>
      </div>

      {/* Modals */}
      <UserFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSaved={fetchUsers}
        editData={editData}
      />
      <HistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default AdminPelanggan;
