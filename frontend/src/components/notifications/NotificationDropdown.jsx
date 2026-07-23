import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCircle, WarningCircle, Clock, Check, Wrench } from '@phosphor-icons/react';
import { useNotification } from '../../context/NotificationContext';

const NotificationDropdown = ({ isOpen, onClose, className = '' }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !e.target.closest('.notif-button')) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`bg-[#0f0f0f] border border-white/[0.08] rounded-2xl shadow-2xl z-[100] overflow-hidden animate-fade-in-up pointer-events-auto ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b border-white/[0.06] flex justify-between items-center bg-white/[0.02]">
        <h3 className="font-bebas text-[20px] text-white tracking-wide">Notifikasi</h3>
        {unreadCount > 0 && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              markAllAsRead();
            }}
            className="text-[12px] text-amber-400 hover:text-amber-300 transition flex items-center gap-1 font-medium z-10 relative cursor-pointer"
          >
            <Check size={14} weight="bold" />
            Tandai semua dibaca
          </button>
        )}
      </div>

      <div className="max-h-[380px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-white/40 flex flex-col items-center gap-2">
            <Bell size={32} weight="light" className="opacity-50" />
            <p className="text-[13px]">Belum ada notifikasi</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (!notif.is_read) markAsRead(notif.id);
                  onClose();
                  navigate('/queue');
                }}
                className={`relative z-10 p-4 border-b border-white/[0.06] last:border-0 cursor-pointer transition-colors flex gap-3 ${notif.is_read ? 'hover:bg-white/[0.04]' : 'bg-amber-400/5 hover:bg-amber-400/10'}`}
              >
                <div className="mt-1 flex-shrink-0">
                  {notif.title.toLowerCase().includes('selesai') ? (
                    <CheckCircle size={20} weight="fill" className="text-green-400" />
                  ) : notif.title.toLowerCase().includes('dikerjakan') ? (
                    <Wrench size={20} weight="fill" className="text-amber-400" />
                  ) : notif.title.toLowerCase().includes('batal') ? (
                    <WarningCircle size={20} weight="fill" className="text-red-400" />
                  ) : (
                    <Clock size={20} weight="fill" className="text-white/40" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-[14px] font-semibold mb-1 ${notif.is_read ? 'text-white/80' : 'text-amber-400'}`}>
                    {notif.title}
                  </p>
                  <p className="text-[12px] text-white/60 leading-relaxed">
                    {notif.message}
                  </p>
                  <p className="text-[10px] text-white/40 mt-2">
                    {new Date(notif.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                {!notif.is_read && (
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
