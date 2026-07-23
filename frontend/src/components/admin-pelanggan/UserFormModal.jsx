import React, { useState, useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import { API_BASE_URL } from '../../config/api';

const UserFormModal = ({ isOpen, onClose, onSaved, editData }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setForm({ name: editData.name, email: editData.email, password: '' });
    } else {
      setForm({ name: '', email: '', password: '' });
    }
    setError('');
  }, [editData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const isEdit = !!editData;
      const url = isEdit ? `${API_BASE_URL}/users/${editData.id}` : `${API_BASE_URL}/users`;
      const method = isEdit ? 'PUT' : 'POST';
      const body = { name: form.name, email: form.email };
      if (form.password) body.password = form.password;
      if (!isEdit) body.password = form.password;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.code === 200 || data.code === 201) {
        onSaved();
        onClose();
      } else {
        setError(data.message || 'Terjadi kesalahan.');
      }
    } catch {
      setError('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-bebas text-xl text-gray-800 tracking-wide">
            {editData ? 'Edit Data Pelanggan' : 'Tambah Pelanggan Baru'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-3 py-2 rounded">
              {error}
            </div>
          )}

          {/* Nama */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Masukkan nama lengkap"
              className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Email / Username
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contoh@email.com"
              className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              {editData ? 'Password Baru' : 'Password'}{' '}
              {editData && <span className="normal-case text-gray-400 font-normal">(kosongkan jika tidak diganti)</span>}
            </label>
            <input
              type="password"
              required={!editData}
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 6 karakter"
              className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-bold uppercase tracking-wider rounded hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-60"
            >
              {loading ? 'Menyimpan...' : editData ? 'Simpan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
