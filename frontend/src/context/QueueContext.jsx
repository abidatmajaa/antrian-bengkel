import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { API_BASE_URL } from '../config/api';


const formatQueueNumber = (letter, num) => `${letter}-${String(num).padStart(3, '0')}`;

// ─── Context ──────────────────────────────────────────────────────────────────
const QueueContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const QueueProvider = ({ children }) => {
  const [queueData, setQueueData] = useState(null);
  const [myAntrian, setMyAntrian] = useState(null); // antrian milik user yang login
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(0);
  const [error, setError] = useState(null);
  const countRef = useRef(null);

  // ── Fetch data antrian hari ini dari API ─────────────────────────────────
  const fetchQueue = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch antrian hari ini (publik)
      const res = await fetch(`${API_BASE_URL}/antrian/today`);
      if (!res.ok) throw new Error('Gagal mengambil data antrian');
      const data = await res.json();

      setQueueData(data.data);
      setLastUpdated(new Date());
      setSecondsSinceUpdate(0);
    } catch (e) {
      setError('Gagal memuat data antrian.');
      console.error('fetchQueue error:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Fetch antrian milik user yang login ──────────────────────────────────
  const fetchMyAntrian = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/antrian/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();

      // Ambil antrian terbaru dengan status waiting/in_progress
      const active = data.data.find(
        (a) => a.status === 'waiting' || a.status === 'in_progress'
      );
      setMyAntrian(active || null);
    } catch (e) {
      console.error('fetchMyAntrian error:', e);
    }
  }, []);

  // ── Auto-polling setiap 30 detik ─────────────────────────────────────────
  useEffect(() => {
    fetchQueue();
    fetchMyAntrian();

    const intervalId = setInterval(() => {
      fetchQueue();
      fetchMyAntrian();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [fetchQueue, fetchMyAntrian]);

  // ── Counter detik sejak update terakhir ──────────────────────────────────
  useEffect(() => {
    if (!lastUpdated) return;
    clearInterval(countRef.current);
    countRef.current = setInterval(() => {
      setSecondsSinceUpdate((s) => s + 1);
    }, 1000);
    return () => clearInterval(countRef.current);
  }, [lastUpdated]);

  // ── Label "Diperbarui X detik/menit lalu" ────────────────────────────────
  const lastUpdatedLabel = (() => {
    if (!lastUpdated) return null;
    if (secondsSinceUpdate < 5) return 'Baru saja';
    if (secondsSinceUpdate < 60) return `${secondsSinceUpdate} detik lalu`;
    return `${Math.floor(secondsSinceUpdate / 60)} menit lalu`;
  })();

  // ── Hitung posisi antrian user dari data hari ini ─────────────────────────
  const myQueueInfo = (() => {
    if (!myAntrian || !queueData) return null;

    const antrians = queueData.antrians || [];
    const myIndex = antrians.findIndex((a) => a.queue_number === myAntrian.queue_number);

    // Hitung berapa orang berstatus waiting di depan saya
    const waitingBeforeMe = antrians.slice(0, myIndex).filter((a) => a.status === 'waiting').length;
    
    // Jika status saya waiting, posisi antrean saya adalah waitingBeforeMe + 1
    // Jika status saya in_progress atau done, posisi antrean = 0
    const position = myAntrian.status === 'waiting' ? waitingBeforeMe + 1 : 0;
    
    // Estimasi per motor misal 45 menit
    const estWait = position > 0 ? position * 45 : 0;

    const estTime = (() => {
      const d = new Date();
      d.setMinutes(d.getMinutes() + estWait);
      return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
    })();

    let servicesArr = [];
    try {
      servicesArr = typeof myAntrian.services === 'string' 
        ? JSON.parse(myAntrian.services) 
        : myAntrian.services;
    } catch (e) {
      servicesArr = [];
    }

    return {
      yourNumber: myAntrian.queue_number,
      currentNumbers: queueData.currentNumbers || [],
      position: Math.max(position, 0),
      totalAhead: Math.max(position, 0),
      estimatedWait: `± ${estWait} menit`,
      estimatedTime: estTime,
      name: myAntrian.name,
      motor: `${myAntrian.motor_brand} ${myAntrian.motor_type}`,
      plate: myAntrian.plate,
      services: servicesArr.join(', '),
      date: new Date(myAntrian.booking_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      estimateCost: `Rp ${(myAntrian.final_price > 0 ? myAntrian.final_price : (myAntrian.estimated_price || 0)).toLocaleString('id-ID')}`,
      status: myAntrian.status,
    };
  })();

  const value = {
    queueData,
    myAntrian,
    myQueueInfo,
    isLoading,
    lastUpdated,
    lastUpdatedLabel,
    secondsSinceUpdate,
    error,
    refetch: () => { fetchQueue(); fetchMyAntrian(); },
  };

  return (
    <QueueContext.Provider value={value}>
      {children}
    </QueueContext.Provider>
  );
};

// ─── Custom Hook ──────────────────────────────────────────────────────────────
export const useQueue = () => {
  const ctx = useContext(QueueContext);
  if (!ctx) throw new Error('useQueue harus digunakan di dalam QueueProvider');
  return ctx;
};

export default QueueContext;
