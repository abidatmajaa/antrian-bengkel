import React, { useEffect } from 'react';
import { CheckCircle, Warning } from '@phosphor-icons/react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = {
    success: 'bg-[#1a1a1a] border-green-500/30 text-white shadow-[0_8px_30px_rgb(0,0,0,0.5)]',
    error: 'bg-[#1a1a1a] border-red-500/30 text-white shadow-[0_8px_30px_rgb(0,0,0,0.5)]'
  };

  const iconColors = {
    success: 'text-green-400',
    error: 'text-red-400'
  };

  const Icon = type === 'success' ? CheckCircle : Warning;

  return (
    <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border ${styles[type]} animate-[slideIn_0.3s_ease-out]`}>
      <div className={`p-1.5 rounded-lg bg-white/5`}>
        <Icon size={20} weight="fill" className={iconColors[type]} />
      </div>
      <span className="font-medium tracking-wide text-[13px]">{message}</span>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%) opacity-0; }
          to { transform: translateX(0) opacity-100; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
