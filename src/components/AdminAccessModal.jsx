'use client';
import React, { useState, useEffect } from 'react';

const BACKEND_URL = 'http://localhost:5001'; // backend URL

export default function AdminAccessModal({ onLoginSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowModal(true);
    } else {
      setShowModal(false);
      localStorage.removeItem('accessToken'); // clear stale sessions
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token for session
      localStorage.setItem('accessToken', data.token);

      // Notify parent to refresh user state
      if (onLoginSuccess) onLoginSuccess();

      setShowModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[90vw] max-w-md">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <input
            type="email"
            className="border p-2 rounded placeholder-gray-500 text-gray-900"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="border p-2 rounded placeholder-gray-500 text-gray-900"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-[#052833] text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}


