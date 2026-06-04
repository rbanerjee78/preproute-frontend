"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, MoreVertical, Clock, HelpCircle, FileText, Plus, Calendar, BarChart2, Users } from 'lucide-react';
import { api } from '@/services/api';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      // 1. Instantly load from cache (Stale-While-Revalidate pattern)
      const cached = sessionStorage.getItem('dashboard_tests_cache');
      if (cached) {
        setTests(JSON.parse(cached));
        setLoading(false); 
      }
      
      // 2. Fetch fresh data in the background
      try {
        const res = await api.tests.getAll();
        if (res.data) {
          setTests(res.data);
          sessionStorage.setItem('dashboard_tests_cache', JSON.stringify(res.data));
        }
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this test?")) {
      try {
        await api.tests.delete(id);
        const updatedTests = tests.filter(t => t.id !== id);
        setTests(updatedTests);
        sessionStorage.setItem('dashboard_tests_cache', JSON.stringify(updatedTests));
      } catch (e: any) {
        alert("Failed to delete test: " + e.message);
      }
    }
    setMenuOpenId(null);
  };

  const handleUnpublish = async (id: string) => {
    try {
      await api.tests.unpublish(id);
      const updatedTests = tests.map(t => t.id === id ? { ...t, status: 'unpublished' } : t);
      setTests(updatedTests);
      sessionStorage.setItem('dashboard_tests_cache', JSON.stringify(updatedTests));
    } catch (e: any) {
      alert("Failed to unpublish test: " + e.message);
    }
    setMenuOpenId(null);
  };

  const filteredTests = React.useMemo(() => {
    return tests.filter((test) => {
      const title = test.name || "Untitled";
      const subject = test.subject || "Unknown";
      const topic = (test.topics && test.topics.length > 0) ? test.topics.join(', ') : "Mixed";
      
      const matchesSearch = 
        title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
        topic.toLowerCase().includes(searchQuery.toLowerCase());
        
      const testStatus = test.status || 'draft';
      const matchesStatus = statusFilter === "All Status" || testStatus.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [tests, searchQuery, statusFilter]);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand-primary)]"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">Test Dashboard</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage and track all your created tests</p>
        </div>
        <Link href="/create-test">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-md text-white bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] font-medium text-sm transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Create New Test
          </button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-lg p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">Total Tests</p>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">24</h3>
          </div>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-lg p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">Total Participants</p>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">842</h3>
          </div>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-lg p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">Avg. Completion Rate</p>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">78%</h3>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tests by name, subject, or topic..." 
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)]"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--color-border-light)] rounded-md bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-[var(--color-border-light)] rounded-md bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-brand-primary)]"
          >
            <option value="All Status">All Status</option>
            <option value="live">Live</option>
            <option value="unpublished">Unpublished</option>
            <option value="scheduled">Scheduled</option>
            <option value="expired">Expired</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Tests Grid */}
      {filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTests.map(test => (
            <div key={test.id} className="bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="p-5 border-b border-[var(--color-border-light)]">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    (test.status || '').toLowerCase() === 'published' || (test.status || '').toLowerCase() === 'live' ? 'bg-green-100 text-green-700' : 'bg-[var(--color-border-light)] text-gray-700'
                  }`}>
                    {(test.status || 'Draft').charAt(0).toUpperCase() + (test.status || 'draft').slice(1).toLowerCase()}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
                    (test.difficulty || '').toLowerCase() === 'easy' ? 'bg-teal-100 text-teal-700' : 
                    (test.difficulty || '').toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      (test.difficulty || '').toLowerCase() === 'easy' ? 'bg-teal-500' : 
                      (test.difficulty || '').toLowerCase() === 'medium' ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}></div> {(test.difficulty || 'Unknown').charAt(0).toUpperCase() + (test.difficulty || 'unknown').slice(1).toLowerCase()}
                  </span>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setMenuOpenId(menuOpenId === test.id ? null : test.id)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-[var(--color-surface-hover)] transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {menuOpenId === test.id && (
                    <div className="absolute right-0 mt-2 w-36 bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-md shadow-lg z-10 py-1">
                      <Link href={`/create-test?testId=${test.id}`}>
                        <button className="w-full text-left px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]">Edit Test</button>
                      </Link>
                      <button onClick={() => handleUnpublish(test.id)} className="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-[var(--color-surface-hover)]">Unpublish</button>
                      <button onClick={() => handleDelete(test.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[var(--color-surface-hover)]">Delete</button>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1 truncate" title={test.name || 'Untitled'}>
                {test.name || 'Untitled'}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] truncate" title={(test.topics && test.topics.length > 0) ? test.topics.join(', ') : "Mixed"}>
                {test.subject || "Unknown"} • {(test.topics && test.topics.length > 0) ? test.topics.join(', ') : "Mixed"}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-5 bg-[var(--color-surface-hover)]/50">
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                  <span><strong className="text-[var(--color-text-primary)] font-semibold">{test.total_questions || 0}</strong> Q's</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span><strong className="text-[var(--color-text-primary)] font-semibold">{test.total_marks || 0}</strong> Marks</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span><strong className="text-[var(--color-text-primary)] font-semibold">{test.total_time || 0} Min</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{test.created_at ? new Date(test.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 border-t border-[var(--color-border-light)] flex justify-between items-center bg-[var(--color-surface)]">
              <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                <Users className="w-4 h-4" />
                <span><strong className="text-[var(--color-text-primary)] font-semibold">{test.participants || 0}</strong> Participated</span>
              </div>
              <button className="text-sm font-semibold text-[var(--color-brand-primary)] hover:text-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-xl text-center">
          <div className="w-16 h-16 bg-[var(--color-surface-hover)] rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">No tests found</h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-sm mx-auto">
            We couldn't find any tests matching your current search or filter criteria.
          </p>
          <button 
            onClick={() => { setSearchQuery(""); setStatusFilter("All Status"); }}
            className="mt-6 px-5 py-2 rounded-md text-sm font-medium text-[var(--color-brand-primary)] bg-[var(--color-brand-light)] hover:bg-blue-100 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

