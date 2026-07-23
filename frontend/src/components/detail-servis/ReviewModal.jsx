import React, { useState } from 'react';
import { X, Star, CircleNotch } from '@phosphor-icons/react';
import { API_BASE_URL } from '../../config/api';

const ReviewModal = ({ isOpen, onClose, antrianId, authHeader, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Silakan pilih rating (1-5 bintang).');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
          antrian_id: antrianId,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        onSuccess(data.data);
      } else {
        setError(data.message || 'Gagal mengirim ulasan.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#0f0f0f] border border-white/[0.08] rounded-[24px] w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <h2 className="font-bebas text-[24px] tracking-wide text-white">Berikan Ulasan</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Rating Stars */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-white/60 text-sm font-medium">Bagaimana pelayanan kami?</p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star 
                      size={36} 
                      weight={(hoverRating || rating) >= star ? 'fill' : 'regular'} 
                      className={(hoverRating || rating) >= star ? 'text-amber-400' : 'text-white/20'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white/80">
                Komentar / Masukan (Opsional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ceritakan pengalaman Anda servis di bengkel kami..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-amber-400/50 focus:bg-white/[0.05] transition-all min-h-[100px] resize-none text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                isSubmitting || rating === 0
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'bg-amber-400 text-black hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]'
              }`}
            >
              {isSubmitting ? (
                <CircleNotch size={20} className="animate-spin" />
              ) : (
                'Kirim Ulasan'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
