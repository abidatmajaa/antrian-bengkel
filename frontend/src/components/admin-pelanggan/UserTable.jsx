import React from 'react';
import { EnvelopeSimple, CalendarBlank, Wrench, PencilSimple, Trash } from '@phosphor-icons/react';

const UserTable = ({ filtered, loading, search, openHistory, openEdit, handleDelete }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 className="text-[15px] font-bold text-gray-800 uppercase tracking-wide">Daftar Pelanggan</h2>
        {loading && <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest animate-pulse">Memuat data...</span>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-gray-200">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Nama Pelanggan</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Email</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Bergabung</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-400 text-sm">
                  {loading ? 'Memuat data pelanggan...' : search ? 'Tidak ada pelanggan yang cocok.' : 'Belum ada data pelanggan.'}
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  {/* Nama */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm shrink-0">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  {/* Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <EnvelopeSimple size={14} className="text-gray-400 shrink-0" />
                      {user.email}
                    </div>
                  </td>
                  {/* Bergabung */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <CalendarBlank size={14} className="text-gray-400 shrink-0" />
                      {new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                  {/* Aksi */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Riwayat */}
                      <button
                        onClick={() => openHistory(user)}
                        title="Lihat Riwayat Servis"
                        className="px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-600 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all shadow-sm inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                      >
                        <Wrench size={13} weight="bold" />
                        Riwayat
                      </button>
                      {/* Edit */}
                      <button
                        onClick={() => openEdit(user)}
                        title="Edit"
                        className="p-1.5 rounded bg-white border border-gray-200 text-gray-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all shadow-sm"
                      >
                        <PencilSimple size={15} weight="bold" />
                      </button>
                      {/* Hapus */}
                      <button
                        onClick={() => handleDelete(user)}
                        title="Hapus"
                        className="p-1.5 rounded bg-white border border-gray-200 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                      >
                        <Trash size={15} weight="bold" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
