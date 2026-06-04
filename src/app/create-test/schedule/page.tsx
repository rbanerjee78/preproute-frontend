import React from 'react';
import Link from 'next/link';
import { Pencil, Clock, HelpCircle, FileText, CheckCircle2, Calendar, ChevronDown } from 'lucide-react';

export default function SchedulePublishPage() {
  return (
    <div className="p-8 max-w-5xl">
      {/* Header and Breadcrumbs */}
      <div className="flex items-center text-sm text-[var(--color-text-secondary)] mb-6">
        <span>Test creation</span>
      </div>

      {/* Test Created Success Badge */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Test created</h2>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-full text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" /> All 50 Questions done
        </div>
      </div>

      {/* Test Summary Card */}
      <div className="border border-[var(--color-border-light)] rounded-lg p-6 mb-8 bg-[var(--color-surface)] relative">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#1f2937] text-white text-xs font-semibold px-3 py-1 rounded-full">Chapter Wise</span>
          </div>
          <button className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)]">
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-orange-500 font-bold text-lg">P</div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Chapter 1</h2>
          <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div> Easy
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="flex">
            <span className="text-[var(--color-text-secondary)] w-24">Subject</span>
            <span className="text-[var(--color-text-primary)] font-medium">: English</span>
          </div>
          <div className="row-span-3 flex flex-col justify-end items-end gap-3 pb-1">
            <div className="flex items-center gap-4 text-[var(--color-text-secondary)] text-sm border border-[var(--color-border-light)] rounded-md px-4 py-2 bg-[var(--color-surface-hover)]">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 60 Min</span>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <span className="flex items-center gap-1.5"><HelpCircle className="w-4 h-4" /> 50 Q's</span>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> 250 Marks</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-[var(--color-text-secondary)] w-24">Topic</span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-600 border border-yellow-200 bg-yellow-50 px-2 py-0.5 rounded text-xs">: Grammar</span>
              <span className="text-yellow-600 border border-yellow-200 bg-yellow-50 px-2 py-0.5 rounded text-xs">Writing</span>
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-[var(--color-text-secondary)] w-24">Sub Topic</span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-600 border border-yellow-200 bg-yellow-50 px-2 py-0.5 rounded text-xs">: Application</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border border-[var(--color-border-light)] rounded-lg p-1 w-fit mb-8 bg-[var(--color-surface)]">
        <button className="px-6 py-2 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] font-medium text-sm transition-colors">
          Publish Now
        </button>
        <button className="px-6 py-2 rounded-md bg-[var(--color-brand-light)] text-[var(--color-brand-dark)] font-medium text-sm shadow-sm">
          Schedule Publish
        </button>
      </div>

      {/* Date and Time Selection */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Select Date and Time</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="relative">
            <input type="date" className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
          </div>
          <div className="relative">
            <input type="time" className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
          </div>
        </div>
      </div>

      {/* Live Until Selection */}
      <div className="mb-10">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Live Until</h4>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">Choose how long this test should remain available on the platform.</p>
        
        <div className="grid grid-cols-2 gap-y-6 gap-x-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="live_until" value="always" className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" />
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">Always Available</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="live_until" value="3_weeks" className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" />
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">3 Weeks</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="live_until" value="1_week" className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" />
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">1 Week</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="live_until" value="1_month" className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" />
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">1 Month</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="live_until" value="2_weeks" className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" />
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">2 Weeks</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="live_until" value="custom" className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" defaultChecked />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">Custom Duration</span>
          </label>
        </div>

        {/* Custom Duration Date/Time */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="relative">
            <input type="date" className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
          </div>
          <div className="relative">
            <input type="time" className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 border-t border-[var(--color-border-light)] pt-6 mt-6 pb-20">
        <Link href="/create-test/questions">
          <button className="px-8 py-2.5 rounded-md text-[var(--color-brand-dark)] bg-[var(--color-brand-light)] font-medium text-sm hover:bg-blue-100 transition-colors">
            Cancel
          </button>
        </Link>
        <button className="px-10 py-2.5 rounded-md text-white bg-[#6b8cff] hover:bg-blue-600 font-medium text-sm transition-colors shadow-sm">
          Confirm
        </button>
      </div>
    </div>
  );
}

