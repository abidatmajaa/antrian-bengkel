import React from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

const ReviewFilters = ({ searchTerm, setSearchTerm, filterRating, setFilterRating }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-800">Daftar Ulasan</h2>
      
      <div className="flex gap-4">
        <div className="relative">
          <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari ulasan..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 w-64 bg-white"
          />
        </div>
        <select 
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
        >
          <option value="all">Semua Rating</option>
          <option value="5">Bintang 5</option>
          <option value="4">Bintang 4</option>
          <option value="3">Bintang 3</option>
          <option value="2">Bintang 2</option>
          <option value="1">Bintang 1</option>
        </select>
      </div>
    </div>
  );
};

export default ReviewFilters;
