"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!userId || !password) {
      setError('Please enter both User ID and Password');
      return;
    }

    try {
      setLoading(true);
      const res = await api.auth.login({ userId, password });
      
      // Store credentials upon successful login
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user || {}));
        router.push('/dashboard');
      } else {
        setError('Login failed: Invalid response from server');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-surface-hover)] items-center justify-center p-4">
      <div className="flex w-full max-w-5xl h-[600px] bg-[var(--color-surface)] rounded-lg shadow-sm border border-[var(--color-border-light)] overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-[#f8fbfd] flex-col items-center justify-center border-r border-[var(--color-border-light)] p-8">
           <img 
             src="/TEST_TUBE_MAN.png" 
             alt="Test Tube Man Illustration" 
             className="w-full max-w-md h-auto object-contain"
           />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-16">
          <div className="mb-10">
            {/* Logo */}
            <div className="flex items-center mb-10">
              <img src="/logo.png" alt="Preproute Logo" className="h-10 w-auto" />
            </div>
            
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Login</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">Use your company provided Login credentials</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--color-text-primary)]">User ID</label>
              <input 
                type="text" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID" 
                className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-transparent text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent text-sm"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--color-text-primary)]">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password" 
                className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-transparent text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent text-sm"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link href="#" className="text-sm text-[var(--color-brand-primary)] hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 px-4 bg-[#5a8af2] hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-md font-medium text-sm transition-colors mt-4"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

