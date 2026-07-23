import React from 'react';
import { useBooking } from '../context/BookingContext';
import { useBookingForm } from '../hooks/useBookingForm';
import { Navbar, Footer } from '../components/home-page';
import {
  BookingSuccess,
  BookingStepper,
  VehicleDataForm,
  BookingConfirmation,
  BookingStepService,
  BookingNavigation,
  BookingStepDate
} from '../components/booking';
import { categories } from '../components/estimasi/EstimasiData';

const STEPS = ['Data Kendaraan', 'Pilih Layanan', 'Pilih Tanggal', 'Konfirmasi'];

const BookingPage = () => {
  const { saveBooking, isSaving, booking } = useBooking();

  const {
    state: { step, form, selectedServices, selectedDate, submitted },
    minPrice,
    maxPrice,
    handleNextStep,
    handlePrevStep,
    handleFormChange,
    toggleService,
    setDate,
    submitForm,
  } = useBookingForm();

  const selectedServiceData = [];
  categories.forEach(cat => {
    cat.items.forEach(item => {
      if (selectedServices.includes(item.id)) {
        selectedServiceData.push({ ...item, Icon: cat.Icon });
      }
    });
  });

  const canProceed = () => {
    if (step === 0) return form.name && form.phone && form.motorBrand && form.motorType && form.plate;
    if (step === 1) return selectedServices.length > 0;
    if (step === 2) return selectedDate;
    return true;
  };

  const handleSubmit = async () => {
    const result = await saveBooking({ form, selectedServices, selectedDate, totalPrice: minPrice });
    if (result.success) {
      submitForm();
    }
  };

  if (submitted) {
    return (
      <BookingSuccess
        form={form}
        minPrice={minPrice}
        maxPrice={maxPrice}
        queueNumber={booking.queueNumber}
        bookingId={booking.bookingId}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#060606] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Navbar />
      <div className="relative max-w-[800px] mx-auto px-5 md:px-8 py-16">
        <div className="mb-14 text-center">
          <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-2">Daftar Sekarang</p>
          <h1 className="font-bebas text-[48px] md:text-[56px] text-white tracking-wide leading-none">
            BOOKING ANTRIAN
          </h1>
        </div>

        <BookingStepper step={step} />

        <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.06] rounded-[32px] p-6 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden animate-fade-in">

          {step === 0 && (
            <VehicleDataForm form={form} handleFormChange={handleFormChange} />
          )}

          {step === 1 && (
            <BookingStepService 
              selectedServices={selectedServices}
              toggleService={toggleService}
              form={form}
              handleFormChange={handleFormChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          )}

          {step === 2 && (
            <BookingStepDate
              selectedDate={selectedDate}
              setDate={setDate}
              selectedServices={selectedServices}
            />
          )}

          {step === 3 && (
            <BookingConfirmation
              form={form}
              selectedServiceData={selectedServiceData}
              minPrice={minPrice}
              maxPrice={maxPrice}
              selectedDate={selectedDate}
            />
          )}

        </div>

        <BookingNavigation
          step={step}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          canProceed={canProceed()}
          handleSubmit={handleSubmit}
          isSaving={isSaving}
          stepsLength={STEPS.length}
        />
      </div>
      <div className="pb-8" />
      <Footer />
    </div>
  );
};

export default BookingPage;
