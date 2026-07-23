import React from 'react';
import { Motorcycle, IdentificationCard } from '@phosphor-icons/react';

const VehicleCard = ({ antrian }) => {
  return (
    <div className="bg-surface-card border border-border rounded-[24px] p-6 flex flex-col gap-4">
       <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border border-outline">
            <Motorcycle size={28} className="text-primary" weight="duotone" />
          </div>
          <div>
            <h3 className="text-text-primary font-bold text-xl">{antrian.motor_brand} {antrian.motor_type}</h3>
            <div className="flex items-center gap-2 mt-1">
               <IdentificationCard size={16} className="text-on-surface-variant" />
               <span className="text-on-surface-variant font-mono text-sm bg-surface-container px-2 py-0.5 rounded border border-border">{antrian.plate}</span>
            </div>
          </div>
       </div>
    </div>
  );
};

export default VehicleCard;
