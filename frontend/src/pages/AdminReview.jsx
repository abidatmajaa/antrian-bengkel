import React, { useState, useEffect } from 'react';
import { AdminSidebar, AdminHeader } from '../components/admin';
import { API_BASE_URL } from '../config/api';
import { ReviewFilters, ReviewTable } from '../components/admin-review';


const AdminReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/admin/reviews`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setReviews(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch = r.User?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.comment?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || r.rating === parseInt(filterRating);
    return matchesSearch && matchesRating;
  });

  return (
    <div className="flex h-screen bg-[#f4f6f9] overflow-hidden font-sans">
      <AdminSidebar activeMenu="review" />
      
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <AdminHeader title="REVIEW PELANGGAN" />
        
        <main className="flex-1 overflow-y-auto p-8">
          
          <ReviewFilters 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            filterRating={filterRating} 
            setFilterRating={setFilterRating} 
          />

          <ReviewTable 
            loading={loading} 
            filteredReviews={filteredReviews} 
          />
          
        </main>
      </div>
    </div>
  );
};

export default AdminReview;
