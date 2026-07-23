import { Engine, Lightning, SteeringWheel, Nut } from '@phosphor-icons/react';

export const categories = [
  {
    id: 'mesin',
    label: 'Masalah Mesin',
    Icon: Engine,
    items: [
      { id: 'tune-up', label: 'Tune Up / Servis Rutin', min: 75000, max: 150000 },
      { id: 'ganti-oli-mesin', label: 'Ganti Oli Mesin', min: 55000, max: 90000 },
      { id: 'karburator', label: 'Bersih Karburator', min: 80000, max: 130000 },
      { id: 'throttle', label: 'Bersih Throttle Body', min: 100000, max: 180000 },
      { id: 'noken-as', label: 'Ganti Noken As', min: 200000, max: 450000 },
      { id: 'piston', label: 'Ganti Piston + Blok', min: 350000, max: 700000 },
    ],
  },
  {
    id: 'kelistrikan',
    label: 'Kelistrikan',
    Icon: Lightning,
    items: [
      { id: 'aki', label: 'Ganti Aki', min: 150000, max: 350000 },
      { id: 'scan-ecu', label: 'Scan ECU', min: 50000, max: 100000 },
      { id: 'lampu', label: 'Ganti Lampu', min: 40000, max: 120000 },
      { id: 'klakson', label: 'Ganti Klakson', min: 25000, max: 70000 },
    ],
  },
  {
    id: 'kaki-kaki',
    label: 'Kaki-kaki & Rem',
    Icon: SteeringWheel,
    items: [
      { id: 'ban-depan', label: 'Ganti Ban Depan', min: 85000, max: 200000 },
      { id: 'ban-belakang', label: 'Ganti Ban Belakang', min: 90000, max: 220000 },
      { id: 'kampas-rem', label: 'Ganti Kampas Rem', min: 45000, max: 120000 },
      { id: 'minyak-rem', label: 'Ganti Minyak Rem', min: 30000, max: 60000 },
      { id: 'shock-depan', label: 'Ganti Shock Depan', min: 200000, max: 500000 },
      { id: 'komstir', label: 'Ganti Komstir', min: 180000, max: 350000 },
    ],
  },
  {
    id: 'transmisi',
    label: 'Transmisi & CVT',
    Icon: Nut,
    items: [
      { id: 'cvt-bersih', label: 'Bersih CVT', min: 80000, max: 150000 },
      { id: 'cvt-ganti', label: 'Ganti Part CVT', min: 150000, max: 400000 },
      { id: 'rantai', label: 'Ganti Rantai + Gir', min: 100000, max: 250000 },
      { id: 'kopling', label: 'Ganti Kampas Kopling', min: 120000, max: 280000 },
    ],
  },
];
