"use client";

import React, { useState } from 'react';
import { Bell } from 'lucide-react';

export const Header = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-16 border-b border-[var(--color-sidebar-border)] bg-white flex items-center justify-between px-4 md:px-8 flex-shrink-0">
      <div className="flex-1 flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 rounded-md focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
            className="relative p-2 text-gray-400 hover:text-[var(--color-brand-primary)] rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-light)] transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 block w-2 h-2 bg-green-500 rounded-full border border-white"></span>
          </button>
          
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-xl z-50 py-2">
              <div className="px-4 py-2 border-b border-gray-100 font-bold text-sm text-[var(--color-text-primary)]">Notifications</div>
              <div className="px-4 py-3 text-sm text-[var(--color-text-secondary)] hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                <span className="font-semibold text-[var(--color-text-primary)]">System</span><br/>
                Your test "Chapter 1" has been successfully created.
              </div>
              <div className="px-4 py-3 text-sm text-[var(--color-text-secondary)] hover:bg-gray-50 cursor-pointer">
                <span className="font-semibold text-[var(--color-text-primary)]">Alex</span><br/>
                Please review the marking scheme.
              </div>
              <div className="px-4 py-2 border-t border-gray-100 text-center">
                <span className="text-xs font-semibold text-[var(--color-brand-primary)] cursor-pointer hover:underline">Mark all as read</span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <div 
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden border border-orange-300">
              {/* Avatar placeholder */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#C2410C"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[var(--color-text-primary)]">Alex Wando</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
              </div>
              <span className="text-xs text-[var(--color-text-muted)]">Admin</span>
            </div>
          </div>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-50 py-1">
              <div className="px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-gray-50 cursor-pointer transition-colors">My Profile</div>
              <div className="px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-gray-50 cursor-pointer transition-colors">Account Settings</div>
              <div className="border-t border-gray-100 my-1"></div>
              <div className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer transition-colors">Sign Out</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
