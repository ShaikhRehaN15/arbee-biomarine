import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="absolute top-0 left-0 w-full z-50 flex flex-col items-center mt-6 pointer-events-none">
      <h1 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">Admin Dashboard</h1>
      <p className="text-white drop-shadow">Welcome, Admin! Here you can manage financial reports and more.</p>
      {/* Add admin features here */}
    </div>
  );
}