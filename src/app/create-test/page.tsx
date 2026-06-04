import React from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CreateTestPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-[var(--color-text-secondary)] mb-8">
        <span>Test Creation</span>
        <span className="mx-2">/</span>
        <span>Create Test</span>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-text-primary)] font-medium">Chapter Wise</span>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border border-[var(--color-border-light)] rounded-lg p-1 w-fit mb-8 max-w-full">
        <button className="px-6 py-2 rounded-md bg-[var(--color-brand-light)] text-[var(--color-brand-dark)] font-medium text-sm">
          Chapter Wise
        </button>
        <button className="px-6 py-2 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] font-medium text-sm transition-colors">
          PYQ
        </button>
        <button className="px-6 py-2 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] font-medium text-sm transition-colors">
          Mock Test
        </button>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        {/* Subject */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-text-primary)]">Subject</label>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]">
              <option value="">Choose from Drop-down</option>
              <option value="math">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="english">English</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Name of Test */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-text-primary)]">Name of Test</label>
          <input 
            type="text" 
            placeholder="Enter name of Test" 
            className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
          />
        </div>

        {/* Topic */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-text-primary)]">Topic</label>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]">
              <option value="">Choose from Drop-down</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Sub Topic */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-text-primary)]">Sub Topic</label>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]">
              <option value="">Choose from Drop-down</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-text-primary)]">Duration (Minutes)</label>
          <input 
            type="text" 
            placeholder="Enter the time" 
            className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
          />
        </div>

        {/* Test Difficulty Level */}
        <div className="space-y-2 flex flex-col justify-center">
          <label className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">Test Difficulty Level</label>
          <div className="flex items-center gap-8 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="difficulty" value="easy" className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" defaultChecked />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">Easy</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="difficulty" value="medium" className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">Medium</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="difficulty" value="difficult" className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">Difficult</span>
            </label>
          </div>
        </div>
      </div>

      {/* Marking Scheme Section */}
      <div className="mb-10">
        <label className="text-sm font-semibold text-[var(--color-text-primary)] block mb-4">Marking Scheme:</label>
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <div className="space-y-2 w-full md:w-32">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">Wrong Answer</label>
            <div className="relative">
              <input type="text" defaultValue="-1" className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                <ChevronUp className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="space-y-2 w-full md:w-32">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">Unattempted</label>
            <div className="relative">
              <input type="text" defaultValue="+0" className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                <ChevronUp className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="space-y-2 w-full md:w-32">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">Correct Answer</label>
            <div className="relative">
              <input type="text" defaultValue="+5" className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                <ChevronUp className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="hidden md:block flex-1"></div>
          
          <div className="space-y-2 w-full md:w-48">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">No of Questions</label>
            <input type="text" placeholder="Ex:250 Marks" className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
          </div>
          <div className="space-y-2 w-full md:w-48">
            <label className="text-sm font-semibold text-gray-300">Total Marks</label>
            <input type="text" placeholder="Ex:250 Marks" disabled className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm placeholder-gray-300 bg-[var(--color-surface)] opacity-60" />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col-reverse md:flex-row justify-end gap-4 border-t border-[var(--color-border-light)] pt-6 mt-6 pb-12">
        <button className="w-full md:w-auto px-8 py-2.5 rounded-md text-[var(--color-brand-dark)] bg-[var(--color-brand-light)] font-medium text-sm hover:bg-blue-100 transition-colors">
          Cancel
        </button>
        <Link href="/create-test/questions">
          <button className="w-full md:w-auto px-10 py-2.5 rounded-md text-white bg-[#6b8cff] hover:bg-blue-600 font-medium text-sm transition-colors shadow-sm flex justify-center">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}

