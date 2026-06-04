"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Pencil, Clock, HelpCircle, FileText, CheckCircle2, Calendar, ChevronDown } from 'lucide-react';
import { api } from '@/services/api';

export default function SchedulePublishPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const testId = searchParams.get('testId');

  const [testDetails, setTestDetails] = useState<any>(null);
  const [publishType, setPublishType] = useState('publish_now'); // 'publish_now' or 'schedule'
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (testId) {
      api.tests.getById(testId).then(res => {
        setTestDetails(res.data || res);
      }).catch(console.error);
    }
  }, [testId]);

  const handlePublish = async () => {
    if (!testId) {
      setError('Test ID is missing.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      let combinedDate = undefined;
      if (publishType === 'schedule') {
        if (!scheduleDate || !scheduleTime) {
          throw new Error("Please select both date and time for scheduling.");
        }
        combinedDate = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
      }
      
      await api.tests.publish(testId, combinedDate);
      alert('Test published successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to publish test.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header and Breadcrumbs */}
      <div className="flex items-center text-sm text-[var(--color-text-secondary)] mb-6">
        <span>Test Creation</span>
        <span className="mx-2">/</span>
        <span>Create Test</span>
        <span className="mx-2">/</span>
        <span>Add Questions</span>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-text-primary)] font-medium">Schedule Test</span>
      </div>

      {/* Test Created Success Badge */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Questions added</h2>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-full text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" /> All questions ready
        </div>
      </div>

      {/* Test Summary Card */}
      <div className="border border-[var(--color-border-light)] rounded-lg p-6 mb-8 bg-[var(--color-surface)] relative">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#1f2937] text-white text-xs font-semibold px-3 py-1 rounded-full">Chapter Wise</span>
          </div>
          <Link href={`/create-test?testId=${testId}`}>
            <button className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)]">
              <Pencil className="w-5 h-5" />
            </button>
          </Link>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-orange-500 font-bold text-lg">P</div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{testDetails?.name || 'Untitled Test'}</h2>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
             testDetails?.difficulty === 'easy' ? 'bg-teal-100 text-teal-700' : 
             testDetails?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              testDetails?.difficulty === 'easy' ? 'bg-teal-500' : 
              testDetails?.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div> {testDetails?.difficulty || 'N/A'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="flex">
            <span className="text-[var(--color-text-secondary)] w-24">Subject</span>
            <span className="text-[var(--color-text-primary)] font-medium">: {testDetails?.subject || 'Unknown'}</span>
          </div>
          <div className="row-span-3 flex flex-col justify-end items-end gap-3 pb-1">
            <div className="flex items-center gap-4 text-[var(--color-text-secondary)] text-sm border border-[var(--color-border-light)] rounded-md px-4 py-2 bg-[var(--color-surface-hover)]">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {testDetails?.total_time || 0} Min</span>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <span className="flex items-center gap-1.5"><HelpCircle className="w-4 h-4" /> {testDetails?.total_questions || 0} Q's</span>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> {testDetails?.total_marks || 0} Marks</span>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">{error}</div>}

      {/* Tabs */}
      <div className="flex border border-[var(--color-border-light)] rounded-lg p-1 w-fit mb-8 bg-[var(--color-surface)]">
        <button 
          onClick={() => setPublishType('publish_now')}
          className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${publishType === 'publish_now' ? 'bg-[var(--color-brand-light)] text-[var(--color-brand-dark)] shadow-sm' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'}`}
        >
          Publish Now
        </button>
        <button 
          onClick={() => setPublishType('schedule')}
          className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${publishType === 'schedule' ? 'bg-[var(--color-brand-light)] text-[var(--color-brand-dark)] shadow-sm' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'}`}
        >
          Schedule Publish
        </button>
      </div>

      {/* Date and Time Selection */}
      {publishType === 'schedule' && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Select Date and Time</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <input 
                type="date" 
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-transparent text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" 
              />
            </div>
            <div className="relative">
              <input 
                type="time" 
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-transparent text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" 
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex justify-between border-t border-[var(--color-border-light)] pt-6 mt-6 pb-20">
        <Link href={`/create-test/questions?testId=${testId}`}>
          <button className="px-8 py-2.5 rounded-md text-[var(--color-text-primary)] bg-[var(--color-surface-hover)] border border-[var(--color-border-light)] font-medium text-sm hover:bg-[var(--color-border-light)] transition-colors">
            Back
          </button>
        </Link>
        <button 
          onClick={handlePublish}
          disabled={loading}
          className="px-10 py-2.5 rounded-md text-white bg-[#6b8cff] hover:bg-blue-600 disabled:bg-blue-400 font-medium text-sm transition-colors shadow-sm"
        >
          {loading ? 'Publishing...' : 'Confirm'}
        </button>
      </div>
    </div>
  );
}
