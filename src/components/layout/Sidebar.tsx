"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileEdit, ClipboardList, PenTool, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Sidebar = ({ onMobileClose }: { onMobileClose?: () => void }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isQuestionCreation = pathname.includes('/questions') || pathname.includes('/schedule');

  if (isQuestionCreation) {
    return (
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out h-screen border-r border-[var(--color-sidebar-border)] bg-white flex flex-col flex-shrink-0 shadow-xl md:shadow-none relative`}>
        <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-6'} border-b border-[var(--color-sidebar-border)]`}>
          <Link href="/" className="flex items-center gap-2" onClick={onMobileClose}>
            {isCollapsed ? (
              <img src="/logo.png" alt="Preproute Logo" className="h-6 w-6 object-cover object-left rounded" />
            ) : (
              <img src="/logo.png" alt="Preproute Logo" className="h-8 w-auto" />
            )}
          </Link>
          <button onClick={onMobileClose} className="md:hidden text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Narrow sidebar */}
          <div className="w-16 flex-shrink-0 border-r border-[var(--color-sidebar-border)] flex flex-col items-center py-4 gap-4 overflow-y-auto overflow-x-hidden no-scrollbar">
             <Link href="/dashboard" className="shrink-0 flex items-center justify-center">
               <LayoutDashboard className="w-5 h-5 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-brand-primary)]" />
             </Link>
             <FileEdit className="w-5 h-5 text-[var(--color-brand-primary)] cursor-pointer shrink-0" />
             <div className="w-5 h-5 border-2 border-[var(--color-text-muted)] rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] text-[var(--color-text-muted)] text-[10px] font-bold">!</div>
             <ClipboardList className="w-5 h-5 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-brand-primary)] shrink-0" />
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-brand-primary)] shrink-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-brand-primary)] shrink-0"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-brand-primary)] shrink-0"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-brand-primary)] shrink-0"><path d="M3 3h18v18H3zM12 8v8M8 12h8"/></svg>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-brand-primary)] shrink-0"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-brand-primary)] shrink-0"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-brand-primary)] shrink-0"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-brand-primary)] shrink-0"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
             
             <div className="mt-auto">
               <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 text-gray-400 hover:text-gray-600 rounded-md">
                 {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
               </button>
             </div>
          </div>
          {/* Question List Sidebar */}
          {!isCollapsed && (
          <div className="flex-1 p-4 overflow-y-auto min-w-[192px]">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-medium text-sm text-[var(--color-text-primary)]">Question creation</h3>
               <button className="text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)]">
                 {/* Double chevron left icon */}
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
               </button>
             </div>
             
             <p className="text-xs text-[var(--color-text-secondary)] mb-4 font-medium">Total Questions . 50</p>
             
             <div className="space-y-2">
               {[1, 2, 3, 4, 5, 6].map((q) => (
                 <div key={q} className={`flex items-center justify-between p-2 rounded text-sm ${q <= 3 || q === 5 || q === 6 ? 'border border-green-200 text-green-700 bg-green-50' : 'border border-[var(--color-border-light)] text-[var(--color-text-muted)]'}`}>
                   <div className="flex items-center gap-2">
                     {q <= 3 || q === 5 || q === 6 ? (
                       <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                     ) : (
                       <div className="w-4 h-4 rounded-full border border-[var(--color-text-muted)]" />
                     )}
                     <span className="font-medium">Question {q}</span>
                   </div>
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </div>
               ))}
             </div>
          </div>
          )}
        </div>
      </aside>
    );
  }

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out h-screen border-r border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] flex flex-col flex-shrink-0 shadow-xl md:shadow-none relative`}>
      <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-6'} mb-4 mt-2`}>
        <Link href="/" className="flex items-center gap-2" onClick={onMobileClose}>
          {isCollapsed ? (
            <img src="/logo.png" alt="Preproute Logo" className="h-6 w-6 object-cover object-left rounded" />
          ) : (
            <img src="/logo.png" alt="Preproute Logo" className="h-8 w-auto" />
          )}
        </Link>
        {!isCollapsed && (
        <button onClick={onMobileClose} className="md:hidden text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <Link 
          href="/dashboard" 
          onClick={onMobileClose}
          title="Dashboard"
          className={`flex items-center gap-3 py-2.5 rounded-md text-sm font-medium ${pathname === '/dashboard' || pathname === '/' ? 'text-[var(--color-brand-primary)] bg-[var(--color-brand-light)] border-l-2 border-[var(--color-brand-primary)] rounded-l-none' : 'text-[var(--color-text-secondary)] hover:bg-gray-100 hover:text-gray-900'} ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Link 
          href="/create-test" 
          onClick={onMobileClose}
          title="Test Creation"
          className={`flex items-center gap-3 py-2.5 rounded-md text-sm font-medium ${pathname.includes('/create-test') ? 'text-[var(--color-brand-primary)] bg-[var(--color-brand-light)] border-l-2 border-[var(--color-brand-primary)] rounded-l-none' : 'text-[var(--color-text-secondary)] hover:bg-gray-100 hover:text-gray-900'} ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
        >
          <FileEdit className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Test Creation</span>}
        </Link>
        <Link 
          href="/tracking" 
          onClick={onMobileClose}
          title="Test Tracking"
          className={`flex items-center gap-3 py-2.5 rounded-md text-sm font-medium ${pathname === '/tracking' ? 'text-[var(--color-brand-primary)] bg-white shadow-sm' : 'text-[var(--color-text-secondary)] hover:bg-gray-100 hover:text-gray-900'} ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
        >
          <ClipboardList className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Test Tracking</span>}
        </Link>
      </nav>

      <div className="p-4 mt-auto border-t border-[var(--color-sidebar-border)] hidden md:block">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="flex items-center justify-center w-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
};
