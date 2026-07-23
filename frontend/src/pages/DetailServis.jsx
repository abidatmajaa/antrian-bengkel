import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Star } from '@phosphor-icons/react';
import { Navbar, Footer } from '../components/home-page';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';
import {
  ServiceInfoCard,
  VehicleCard,
  ServiceBreakdown,
  ReviewModal,
} from '../components/detail-servis';


const progressSteps = [
  { key: 'waiting', label: 'Menunggu Antrian', desc: 'Kendaraan sudah masuk antrean', time: '' },
  { key: 'in_progress', label: 'Pengerjaan', desc: 'Teknisi sedang mengerjakan kendaraan', time: '' },
  { key: 'done', label: 'Selesai', desc: 'Kendaraan siap diambil', time: '' },
];

const DetailServisPage = () => {
  const { id } = useParams();
  const { authHeader } = useAuth();
  const navigate = useNavigate();
  const [antrian, setAntrian] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  useEffect(() => {
    const fetchAntrian = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/antrian/${id}`, {
          headers: authHeader(),
        });
        const data = await res.json();
        if (res.ok) {
          setAntrian(data.data);
        } else {
          setError(data.message || 'Gagal mengambil data servis.');
        }
      } catch (err) {
        setError('Gagal terhubung ke server.');
      } finally {
        setLoading(false);
      }
    };
    fetchAntrian();
  }, [id, authHeader]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (error) return <div className="min-h-screen bg-background flex flex-col items-center justify-center text-error gap-4"><p>{error}</p><button onClick={() => navigate('/profile')} className="px-4 py-2 border border-error rounded text-sm hover:bg-error/20 transition">Kembali</button></div>;
  if (!antrian) return null;

  let activeStepIndex = 0;
  if (antrian.status === 'in_progress') activeStepIndex = 1;
  else if (antrian.status === 'done') activeStepIndex = 2;

  const stepsWithDone = progressSteps.map((step, i) => ({
    ...step,
    done: i <= activeStepIndex,
    isCurrent: i === activeStepIndex,
  }));

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-error/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <Navbar />

      <main className="relative max-w-2xl mx-auto px-5 pt-24 pb-32 flex flex-col gap-6">

        <button onClick={() => navigate('/profile')} className="flex items-center gap-2 text-on-surface-variant hover:text-text-primary transition-colors w-fit text-sm mb-[-10px]">
          <ArrowLeft size={16} /> Kembali ke Profil
        </button>

        <div className="flex flex-col gap-2">
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.15em]">
            Servis #{antrian.id}
          </p>
          <h1 className="font-display-xl-mobile text-display-xl-mobile text-text-primary uppercase border-b border-border pb-2 inline-block">
            Detail Servis
          </h1>

          {antrian.status === 'done' && !antrian.Review && (
            <button
              onClick={() => setIsReviewOpen(true)}
              className="mt-4 flex items-center justify-center gap-2 w-fit px-6 py-2.5 bg-amber-400 text-black font-semibold rounded-xl hover:bg-amber-300 transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]"
            >
              <Star size={18} weight="fill" />
              Beri Ulasan
            </button>
          )}

          {antrian.status === 'done' && antrian.Review && (
            <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-2 w-fit">
              <p className="text-sm font-medium text-white/60">Ulasan Anda</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    weight={s <= antrian.Review.rating ? "fill" : "regular"}
                    className={s <= antrian.Review.rating ? "text-amber-400" : "text-white/20"}
                  />
                ))}
              </div>
              {antrian.Review.comment && (
                <p className="text-sm text-white/80 italic mt-1">"{antrian.Review.comment}"</p>
              )}
            </div>
          )}
        </div>

        <ServiceInfoCard antrian={antrian} />

        <VehicleCard antrian={antrian} />

        <div className="bg-surface-container border border-outline rounded-[32px] p-6 lg:p-8">
          <h3 className="font-bebas text-[24px] text-text-primary tracking-wide mb-8">Timeline Pengerjaan</h3>
          <div className="space-y-0">
            {stepsWithDone.map((step, idx) => {
              const isLast = idx === stepsWithDone.length - 1;
              return (
                <div key={step.key} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300 ${step.isCurrent
                      ? 'border-primary bg-primary/10'
                      : step.done
                        ? 'border-success bg-success/10'
                        : 'border-on-surface-variant/20 bg-surface-container'
                      }`}>
                      {step.isCurrent ? (
                        <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                      ) : step.done ? (
                        <CheckCircle size={18} weight="bold" className="text-success" />
                      ) : (
                        <div className="w-1.5 h-1.5 bg-on-surface-variant/40 rounded-full" />
                      )}
                    </div>
                    {!isLast && (
                      <div className={`w-0.5 flex-1 my-2 transition-all duration-300 ${step.done ? 'bg-success/30' : 'bg-on-surface-variant/10'}`} style={{ minHeight: '36px' }} />
                    )}
                  </div>

                  <div className={`pb-8 pt-1 ${isLast ? 'pb-0' : ''}`}>
                    <div className="flex items-center gap-3 mb-1">
                      <p className={`text-[15px] font-semibold transition-colors ${step.isCurrent ? 'text-primary' : step.done ? 'text-text-primary' : 'text-on-surface-variant'}`}>
                        {step.label}
                      </p>
                      {step.isCurrent && (
                        <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                          Sekarang
                        </span>
                      )}
                    </div>
                    <p className={`text-[13px] mb-1 transition-colors ${step.done ? 'text-text-primary/70' : 'text-on-surface-variant'}`}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ServiceBreakdown antrian={antrian} />

      </main>

      <Footer />

      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        antrianId={antrian.id}
        authHeader={authHeader}
        onSuccess={(reviewData) => {
          setAntrian(prev => ({ ...prev, Review: reviewData }));
          setIsReviewOpen(false);
        }}
      />
    </div>
  );
};

export default DetailServisPage;
