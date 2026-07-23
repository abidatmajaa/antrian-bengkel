import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

export const useAdminDashboard = () => {
  const [queue, setQueue] = useState([]);
  const [stats, setStats] = useState({ total: 0, inProgress: 0, finished: 0 });
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [selectedAntrian, setSelectedAntrian] = useState(null);
  const [extraItems, setExtraItems] = useState([{ name: '', price: '' }]);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '', phone: '', motorBrand: '', motorType: '', plate: '', notes: '',
  });
  const [addServices, setAddServices] = useState([]);
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);

  const fetchTodayQueue = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/antrian/today`);
      const data = await res.json();
      if (data.code === 200) {
        setQueue(data.data.antrians);
        const inProgress = data.data.antrians.filter((a) => a.status === 'in_progress').length;
        const finished = data.data.antrians.filter((a) => a.status === 'done').length;
        setStats({ total: data.data.total, inProgress, finished });
      }
    } catch (err) {
      console.error('Failed to fetch queue:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayQueue();
    const interval = setInterval(fetchTodayQueue, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/antrian/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updatedQueue = queue.map((q) => (q.id === id ? { ...q, status: newStatus } : q));
        setQueue(updatedQueue);
        setStats({
          total: updatedQueue.length,
          inProgress: updatedQueue.filter((a) => a.status === 'in_progress').length,
          finished: updatedQueue.filter((a) => a.status === 'done').length,
        });
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const openTagihanModal = (antrian, viewOnly = false) => {
    setSelectedAntrian(antrian);
    setIsViewOnly(viewOnly);
    setExtraItems(
      antrian.final_items?.length > 0
        ? antrian.final_items.map((p) =>
          typeof p === 'object' && p !== null ? { name: p.name, price: p.price } : { name: p, price: '' }
        )
        : [{ name: '', price: '' }]
    );
    setIsModalOpen(true);
  };

  const handleSaveTagihan = async () => {
    if (!selectedAntrian) return;
    const validItems = extraItems
      .filter((item) => item.name.trim() !== '')
      .map((item) => ({ name: item.name.trim(), price: parseInt(item.price) || 0 }));
    const calculatedTotalPrice = validItems.reduce((sum, item) => sum + item.price, 0);

    setQueue(queue.map((q) =>
      q.id === selectedAntrian.id ? { ...q, final_items: validItems, final_price: calculatedTotalPrice } : q
    ));
    try {
      await fetch(`${API_BASE_URL}/antrian/${selectedAntrian.id}/tagihan`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ final_items: validItems, final_price: calculatedTotalPrice }),
      });
    } catch (err) {
      console.error('Failed to save tagihan:', err);
    }
    setIsModalOpen(false);
    setSelectedAntrian(null);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!addForm.name || !addForm.phone || !addForm.motorBrand || !addForm.motorType || !addForm.plate || addServices.length === 0) {
      alert('Mohon lengkapi semua field dan pilih minimal satu layanan!');
      return;
    }
    setIsSubmittingAdd(true);
    try {
      const res = await fetch(`${API_BASE_URL}/antrian/offline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...addForm,
          services: addServices,
          totalPrice: addServices.includes('servis-besar') ? 200000 : 75000,
        }),
      });
      if (res.ok) {
        setIsAddModalOpen(false);
        setAddForm({ name: '', phone: '', motorBrand: '', motorType: '', plate: '', notes: '' });
        setAddServices([]);
        fetchTodayQueue();
      } else {
        alert('Gagal menambah antrean offline');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan sistem');
    } finally {
      setIsSubmittingAdd(false);
    }
  };

  return {
    queue,
    stats,
    loading,
    isModalOpen, setIsModalOpen,
    isViewOnly,
    extraItems, setExtraItems,
    isDetailModalOpen, setIsDetailModalOpen,
    selectedDetail, setSelectedDetail,
    isAddModalOpen, setIsAddModalOpen,
    addForm, setAddForm,
    addServices, setAddServices,
    isSubmittingAdd,
    handleUpdateStatus,
    openTagihanModal,
    handleSaveTagihan,
    handleAddSubmit
  };
};
