import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';


const initialState = {
  bookingId: null,
  form: { name: '', phone: '', motorBrand: '', motorType: '', year: '', plate: '', notes: '' },
  selectedServices: [],
  totalPrice: 0,
  status: null,
};

const STORAGE_KEY = 'antrian_bengkel_booking';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialState;
    } catch {
      return initialState;
    }
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
    } catch (e) {
      console.warn('Gagal menyimpan data booking ke localStorage', e);
    }
  }, [booking]);

  const saveBooking = async ({ form, selectedServices, selectedDate, totalPrice }) => {
    setIsSaving(true);

    const token = localStorage.getItem('token');

    try {
      const bookingDate = selectedDate;

      const response = await fetch(`${API_BASE_URL}/antrian`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          motorBrand: form.motorBrand,
          motorType: form.motorType,
          year: form.year,
          plate: form.plate,
          notes: form.notes,
          services: selectedServices,
          totalPrice,
          bookingDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setBooking((prev) => ({
          ...prev,
          status: 'error',
          errorMessage: data.message || 'Gagal membuat booking.',
        }));
        return { success: false, message: data.message };
      }

      setBooking({
        bookingId: data.data.booking_id,
        queueNumber: data.data.queue_number,
        form,
        selectedServices,
        totalPrice,
        status: 'submitted',
        errorMessage: null,
      });

      return { success: true, data: data.data };
    } catch (error) {
      console.error('saveBooking error:', error);
      setBooking((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Gagal terhubung ke server.',
      }));
      return { success: false, message: 'Gagal terhubung ke server.' };
    } finally {
      setIsSaving(false);
    }
  };

  // Reset booking
  const clearBooking = () => {
    setBooking(initialState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    booking,
    saveBooking,
    clearBooking,
    isSaving,
    isBooked: booking.status === 'submitted',
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking harus digunakan di dalam BookingProvider');
  return ctx;
};

export default BookingContext;
