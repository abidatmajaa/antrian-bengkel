import React, { useState } from 'react';
import { Bell } from '@phosphor-icons/react';
import { useNotification } from '../../context/NotificationContext';
import NotificationDropdown from '../notifications/NotificationDropdown';

const AdminHeader = ({ title, children }) => {
  const { unreadCount } = useNotification();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="bg-white h-16 flex items-center px-8 shadow-sm z-10 shrink-0 justify-between">
      <h1 className="font-bebas text-[28px] text-gray-800 tracking-wide mt-1">{title}</h1>
      <div className="flex items-center gap-4">
        {children && <div className="flex items-center gap-3">{children}</div>}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="notif-button relative p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-all duration-200"
          >
            <Bell size={22} weight={unreadCount > 0 ? 'fill' : 'regular'} className={unreadCount > 0 ? 'text-amber-500' : ''} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            )}
          </button>
          <NotificationDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} className="absolute top-12 right-0 w-[340px]" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
