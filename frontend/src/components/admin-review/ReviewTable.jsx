import React from 'react';
import { Star, ChatText, User } from '@phosphor-icons/react';

const ReviewTable = ({ loading, filteredReviews }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            weight={i < rating ? 'fill' : 'regular'} 
            className={i < rating ? 'text-amber-400' : 'text-gray-300'} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">Tanggal</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%]">Pelanggan</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[25%]">Servis (Kendaraan)</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">Rating</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[25%]">Ulasan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400 text-sm">
                  Memuat data ulasan...
                </td>
              </tr>
            ) : filteredReviews.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400 text-sm flex flex-col items-center justify-center">
                  <ChatText size={32} className="text-gray-300 mb-2" />
                  Belum ada ulasan ditemukan.
                </td>
              </tr>
            ) : (
              filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(review.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <User size={16} weight="fill" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">{review.User?.name || '-'}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[120px]" title={review.User?.email}>{review.User?.email || '-'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-xs font-mono text-amber-600 font-bold mb-1">{review.Antrian?.booking_id || '-'}</p>
                    <p className="text-sm text-gray-700 line-clamp-1">
                      {review.Antrian?.motor_brand} {review.Antrian?.motor_type}
                    </p>
                  </td>
                  <td className="p-4">
                    {renderStars(review.rating)}
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-600 italic">
                      "{review.comment}"
                    </p>
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

export default ReviewTable;
