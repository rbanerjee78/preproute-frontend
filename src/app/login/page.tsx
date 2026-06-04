import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
      <div className="flex w-full max-w-5xl h-[600px] bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-[#f8fbfd] flex-col items-center justify-center border-r border-gray-100 p-8">
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

          <form className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--color-text-primary)]">User ID</label>
              <input 
                type="text" 
                placeholder="Enter User ID" 
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent text-sm"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--color-text-primary)]">Password</label>
              <input 
                type="password" 
                placeholder="Enter Password" 
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent text-sm"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link href="#" className="text-sm text-[var(--color-brand-primary)] hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <Link href="/create-test" className="block w-full">
              <button 
                type="button" 
                className="w-full py-3 px-4 bg-[#5a8af2] hover:bg-blue-600 text-white rounded-md font-medium text-sm transition-colors mt-4"
              >
                Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
