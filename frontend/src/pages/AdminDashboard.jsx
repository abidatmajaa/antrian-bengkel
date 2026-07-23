import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import {
  AdminSidebar,
  AdminHeader,
  DashboardStats,
  DashboardActions,
  QueueTable,
  ModalTagihan,
  ModalDetail,
  ModalTambahAntrean,
} from '../components/admin';


const AdminDashboard = () => {
  const navigate = useNavigate();

  const {
    queue, stats, loading,
    isModalOpen, setIsModalOpen, isViewOnly, extraItems, setExtraItems,
    isDetailModalOpen, setIsDetailModalOpen, selectedDetail, setSelectedDetail,
    isAddModalOpen, setIsAddModalOpen, addForm, setAddForm, addServices, setAddServices, isSubmittingAdd,
    handleUpdateStatus, openTagihanModal, handleSaveTagihan, handleAddSubmit
  } = useAdminDashboard();

  const getStatusBadge = (status) => {
    const map = {
      waiting: <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[11px] font-bold tracking-wider rounded-sm uppercase">Menunggu</span>,
      in_progress: <span className="px-2.5 py-1 bg-sky-100 text-sky-700 text-[11px] font-bold tracking-wider rounded-sm uppercase">Dikerjakan</span>,
      done: <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[11px] font-bold tracking-wider rounded-sm uppercase">Selesai</span>,
    };
    return map[status] ?? (
      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[11px] font-bold tracking-wider rounded-sm uppercase">{status}</span>
    );
  };



  return (
    <div className="flex h-screen bg-[#f4f6f9] overflow-hidden font-sans">
      <AdminSidebar activeMenu="dashboard" />

      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <AdminHeader title="DASHBOARD" />

        <main className="flex-1 overflow-y-auto p-8">
          <DashboardStats stats={stats} />

          <DashboardActions
            onAddClick={() => setIsAddModalOpen(true)}
            onLaporanClick={() => navigate('/admin/laporan')}
          />

          <QueueTable
            queue={queue}
            loading={loading}
            getStatusBadge={getStatusBadge}
            onDetail={(q) => { setSelectedDetail(q); setIsDetailModalOpen(true); }}
            onKerjakan={(id) => handleUpdateStatus(id, 'in_progress')}
            onTagihan={(q) => openTagihanModal(q)}
            onSelesai={(id) => handleUpdateStatus(id, 'done')}
            onNota={(q) => openTagihanModal(q, true)}
          />
        </main>
      </div>

      {/* Modals */}
      <ModalTagihan
        isOpen={isModalOpen}
        isViewOnly={isViewOnly}
        extraItems={extraItems}
        onClose={() => setIsModalOpen(false)}
        onAddItem={() => setExtraItems([...extraItems, { name: '', price: '' }])}
        onChangeItem={(i, field, val) => {
          const items = [...extraItems];
          items[i][field] = val;
          setExtraItems(items);
        }}
        onRemoveItem={(i) => setExtraItems(extraItems.filter((_, idx) => idx !== i))}
        onSave={handleSaveTagihan}
      />

      <ModalDetail
        isOpen={isDetailModalOpen}
        detail={selectedDetail}
        onClose={() => setIsDetailModalOpen(false)}
        getStatusBadge={getStatusBadge}
      />

      <ModalTambahAntrean
        isOpen={isAddModalOpen}
        form={addForm}
        services={addServices}
        isSubmitting={isSubmittingAdd}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        onFormChange={(field, val) => setAddForm({ ...addForm, [field]: val })}
        onServicesChange={(svc, checked) =>
          setAddServices(checked ? [...addServices, svc] : addServices.filter((s) => s !== svc))
        }
      />
    </div>
  );
};

export default AdminDashboard;
