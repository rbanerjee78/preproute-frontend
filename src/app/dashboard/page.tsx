"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, MoreVertical, Clock, HelpCircle, FileText, Plus, Calendar, BarChart2, Users } from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const mockTests = [
    {
      id: 1,
      title: "Chapter 1: Basics",
      subject: "English",
      topic: "Grammar",
      questions: 50,
      time: "60 Min",
      marks: 250,
      difficulty: "Easy",
      status: "Published",
      date: "Oct 12, 2026",
      participants: 124
    },
    {
      id: 2,
      title: "Mid-Term Assessment",
      subject: "Mathematics",
      topic: "Algebra",
      questions: 40,
      time: "90 Min",
      marks: 200,
      difficulty: "Medium",
      status: "Draft",
      date: "Oct 15, 2026",
      participants: 0
    },
    {
      id: 3,
      title: "Advanced Physics Quiz",
      subject: "Physics",
      topic: "Mechanics",
      questions: 30,
      time: "45 Min",
      marks: 150,
      difficulty: "Hard",
      status: "Published",
      date: "Oct 18, 2026",
      participants: 89
    }
  ];

  const filteredTests = mockTests.filter((test) => {
    const matchesSearch = 
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      test.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      test.topic.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "All Status" || test.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
        <div className="bg-white border border-[var(--color-border-light)] rounded-lg p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">Total Tests</p>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">24</h3>
          </div>
        </div>
        <div className="bg-white border border-[var(--color-border-light)] rounded-lg p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">Total Participants</p>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">842</h3>
          </div>
        </div>
        <div className="bg-white border border-[var(--color-border-light)] rounded-lg p-6 flex items-center gap-4">
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
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[var(--color-border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)]"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--color-border-light)] rounded-md bg-white text-sm font-medium text-[var(--color-text-secondary)] hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-[var(--color-border-light)] rounded-md bg-white text-sm font-medium text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-brand-primary)]"
          >
            <option value="All Status">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Tests Grid */}
      {filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTests.map(test => (
            <div key={test.id} className="bg-white border border-[var(--color-border-light)] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="p-5 border-b border-[var(--color-border-light)]">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    test.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {test.status}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
                    test.difficulty === 'Easy' ? 'bg-teal-100 text-teal-700' : 
                    test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      test.difficulty === 'Easy' ? 'bg-teal-500' : 
                      test.difficulty === 'Medium' ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}></div> {test.difficulty}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1 truncate" title={test.title}>
                {test.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {test.subject} • {test.topic}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-5 bg-gray-50/50">
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                  <span><strong className="text-[var(--color-text-primary)] font-semibold">{test.questions}</strong> Q's</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span><strong className="text-[var(--color-text-primary)] font-semibold">{test.marks}</strong> Marks</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span><strong className="text-[var(--color-text-primary)] font-semibold">{test.time}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{test.date}</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 border-t border-[var(--color-border-light)] flex justify-between items-center bg-white">
              <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                <Users className="w-4 h-4" />
                <span><strong className="text-[var(--color-text-primary)] font-semibold">{test.participants}</strong> Participated</span>
              </div>
              <button className="text-sm font-semibold text-[var(--color-brand-primary)] hover:text-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-[var(--color-border-light)] rounded-xl text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
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
