"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Pencil, Clock, HelpCircle, FileText, Plus, Trash2, ChevronLeft, ChevronRight, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, ChevronDown } from 'lucide-react';

export default function AddQuestionsPage() {
  const [options, setOptions] = useState([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' },
  ]);
  const [correctOptionId, setCorrectOptionId] = useState(1);
  const [nextId, setNextId] = useState(5);
  const [solutions, setSolutions] = useState([{ id: 1, text: '' }]);
  const [nextSolutionId, setNextSolutionId] = useState(2);

  const handleAddOption = () => {
    setOptions([...options, { id: nextId, text: '' }]);
    setNextId(nextId + 1);
  };

  const handleDeleteOption = (id: number) => {
    setOptions(options.filter(opt => opt.id !== id));
    if (correctOptionId === id) {
      setCorrectOptionId(options.find(opt => opt.id !== id)?.id || 0);
    }
  };

  const handleOptionChange = (id: number, text: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text } : opt));
  };

  const handleAddSolution = () => {
    setSolutions([...solutions, { id: nextSolutionId, text: '' }]);
    setNextSolutionId(nextSolutionId + 1);
  };

  const handleDeleteSolution = (id: number) => {
    setSolutions(solutions.filter(sol => sol.id !== id));
  };

  const handleSolutionChange = (id: number, text: string) => {
    setSolutions(solutions.map(sol => sol.id === id ? { ...sol, text } : sol));
  };

  return (
    <div className="p-8 max-w-5xl">
      {/* Header and Breadcrumbs */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
          <span>Test Creation</span>
          <span className="mx-2">/</span>
          <span>Create Test</span>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-text-primary)] font-medium">Chapter Wise</span>
        </div>
        <button className="px-6 py-2 rounded-md text-white bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] font-medium text-sm transition-colors shadow-sm">
          Publish
        </button>
      </div>

      {/* Test Summary Card */}
      <div className="border border-[var(--color-border-light)] rounded-lg p-6 mb-8 bg-white relative">
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
            <div className="flex items-center gap-4 text-[var(--color-text-secondary)] text-sm">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 60 Min</span>
              <span className="flex items-center gap-1.5"><HelpCircle className="w-4 h-4" /> 50 Q's</span>
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

      {/* Question Editor */}
      <div className="mb-6 flex justify-between items-center">
        <h3 className="font-semibold text-[var(--color-text-primary)]">Question 4<span className="text-[var(--color-brand-secondary)] font-normal">/50</span></h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border-light)] rounded text-xs font-medium text-[var(--color-text-secondary)] hover:bg-gray-50">
            <Plus className="w-3.5 h-3.5" /> MCQ
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border-light)] rounded text-xs font-medium text-[var(--color-text-secondary)] hover:bg-gray-50">
            <Plus className="w-3.5 h-3.5" /> CSV
          </button>
        </div>
      </div>

      <button className="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-xs font-medium mb-4">
        <Trash2 className="w-3.5 h-3.5" /> Delete All Edits
      </button>

      {/* Rich Text Editor Placeholder */}
      <div className="border border-[var(--color-border-light)] rounded-md mb-8 overflow-hidden bg-white">
        <div className="flex items-center gap-3 p-2 border-b border-[var(--color-border-light)] bg-gray-50 text-[var(--color-text-muted)]">
          <Bold className="w-4 h-4 cursor-pointer hover:text-gray-700" />
          <Italic className="w-4 h-4 cursor-pointer hover:text-gray-700" />
          <Underline className="w-4 h-4 cursor-pointer hover:text-gray-700" />
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <LinkIcon className="w-4 h-4 cursor-pointer hover:text-gray-700" />
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <List className="w-4 h-4 cursor-pointer hover:text-gray-700" />
          <ListOrdered className="w-4 h-4 cursor-pointer hover:text-gray-700" />
          <ImageIcon className="w-4 h-4 cursor-pointer hover:text-gray-700" />
        </div>
        <div className="relative">
          <textarea 
            className="w-full h-32 p-4 text-sm focus:outline-none resize-none placeholder-gray-300"
            placeholder="Type here"
          ></textarea>
          <Trash2 className="absolute right-4 top-4 w-4 h-4 text-gray-300 cursor-pointer hover:text-red-500" />
        </div>
      </div>

      {/* Options */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Type the options below</h4>
        <div className="space-y-3 mb-4">
          {options.map((opt) => (
            <div key={opt.id} className="flex items-center gap-4">
              <label className="cursor-pointer relative flex items-center">
                <input 
                  type="radio" 
                  name="correct_option" 
                  value={opt.id} 
                  className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" 
                  checked={correctOptionId === opt.id}
                  onChange={() => setCorrectOptionId(opt.id)}
                />
              </label>
              <div className="flex-1 relative border border-[var(--color-border-light)] rounded-md overflow-hidden bg-white">
                <input 
                  type="text" 
                  placeholder="Type Option here" 
                  value={opt.text}
                  onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                  className="w-full py-2.5 px-4 text-sm focus:outline-none placeholder-gray-300" 
                />
                <Trash2 
                  onClick={() => handleDeleteOption(opt.id)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 cursor-pointer hover:text-red-500" 
                />
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={handleAddOption}
          className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand-primary)] hover:text-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Option
        </button>
      </div>

      {/* Solution */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Add Solution</h4>
        <div className="space-y-4 mb-4">
          {solutions.map((sol) => (
            <div key={sol.id} className="relative border border-[var(--color-border-light)] rounded-md overflow-hidden bg-white">
              <textarea 
                value={sol.text}
                onChange={(e) => handleSolutionChange(sol.id, e.target.value)}
                className="w-full h-24 p-4 text-sm focus:outline-none resize-none placeholder-gray-300"
                placeholder="Type here"
              ></textarea>
              <Trash2 
                onClick={() => handleDeleteSolution(sol.id)}
                className="absolute right-4 top-4 w-4 h-4 text-gray-300 cursor-pointer hover:text-red-500" 
              />
            </div>
          ))}
        </div>
        <button 
          onClick={handleAddSolution}
          className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand-primary)] hover:text-blue-700"
        >
          <Plus className="w-4 h-4" /> Add More Solution
        </button>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-8 mb-8 text-[var(--color-text-muted)]">
        <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-gray-700" />
        <ChevronRight className="w-5 h-5 cursor-pointer hover:text-gray-700" />
      </div>

      {/* Question Settings */}
      <div className="mb-10">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Question settings</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Level of Difficulty</label>
            <div className="relative">
              <select className="w-full appearance-none px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]">
                <option value="">Select from Drop-down</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Topic</label>
            <div className="relative">
              <select className="w-full appearance-none px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]">
                <option value="">Select from Drop-down</option>
                <option value="grammar">Grammar</option>
                <option value="vocabulary">Vocabulary</option>
                <option value="reading">Reading Comprehension</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Sub-topic</label>
            <div className="relative">
              <select className="w-full appearance-none px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]">
                <option value="">Select from Drop-down</option>
                <option value="nouns">Nouns & Pronouns</option>
                <option value="verbs">Verbs & Tenses</option>
                <option value="adjectives">Adjectives & Adverbs</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between border-t border-[var(--color-border-light)] pt-6 mt-6 pb-20">
        <Link href="/create-test">
          <button className="px-6 py-2.5 rounded-md text-white bg-red-400 hover:bg-red-500 font-medium text-sm transition-colors shadow-sm">
            Exit Test Creation
          </button>
        </Link>
        <Link href="/create-test/schedule">
          <button className="px-10 py-2.5 rounded-md text-white bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] font-medium text-sm transition-colors shadow-sm">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
