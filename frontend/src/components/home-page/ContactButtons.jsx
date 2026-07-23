import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';

const ContactButtons = () => {
  return (
    <div className="fixed bottom-6 right-5 flex flex-col gap-3 items-end z-40">
      {/* WhatsApp */}
      <a
        href="https://wa.me/628123456789"
        target="_blank"
        rel="noreferrer"
        aria-label="Hubungi via WhatsApp"
        className="btn-whatsapp"
      >
        <WhatsappLogo size={24} weight="fill" />
        <span className="hidden sm:block font-semibold text-[14px] pr-1">Tanya CS Kami</span>
      </a>
    </div>
  );
};

export default ContactButtons;
