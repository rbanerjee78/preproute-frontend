"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Pencil, Clock, HelpCircle, FileText, Plus, Trash2, ChevronLeft, ChevronRight, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { api } from '@/services/api';

export default function AddQuestionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const testId = searchParams.get('testId');

  // Test Details (Mock fetched from testId if real API supported it)
  const [testDetails, setTestDetails] = useState<any>(null);

  // Local state for all questions added so far
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Current question form state
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' },
  ]);
  const [correctOptionId, setCorrectOptionId] = useState(1);
  const [solution, setSolution] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch test details to display in header
  useEffect(() => {
    if (testId) {
      api.tests.getById(testId).then(async res => {
        const test = res.data || res;
        setTestDetails(test);
        
        // Load existing questions
        if (test.questions && test.questions.length > 0) {
          try {
            let qList = test.questions;
            if (typeof test.questions[0] === 'string') {
              const qRes = await api.questions.fetchBulk(test.questions);
              qList = qRes.data || qRes;
            }
            setQuestionsList(qList);
            
            // Populate form with first question
            if (qList.length > 0) {
              const q = qList[0];
              setQuestionText(q.question);
              setOptions([
                { id: 1, text: q.option1 },
                { id: 2, text: q.option2 },
                { id: 3, text: q.option3 },
                { id: 4, text: q.option4 },
              ]);
              setCorrectOptionId(parseInt(q.correct_option.replace('option', '')) || 1);
              setSolution(q.explanation || '');
              setDifficulty(q.difficulty || 'medium');
            }
          } catch (e) {
            console.error("Failed to fetch existing questions:", e);
          }
        }
      }).catch(console.error);
    }
  }, [testId]);

  const handleOptionChange = (id: number, text: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text } : opt));
  };

  const handleSaveCurrentQuestion = () => {
    setError('');
    if (!questionText.trim()) {
      setError("Question text cannot be empty.");
      return;
    }
    if (options.some(opt => !opt.text.trim())) {
      setError("All 4 options must be filled.");
      return;
    }

    const newQuestion = {
      type: "mcq",
      question: questionText,
      option1: options[0].text,
      option2: options[1].text,
      option3: options[2].text,
      option4: options[3].text,
      correct_option: `option${correctOptionId}`,
      explanation: solution,
      difficulty,
      test_id: testId as string,
      subject: testDetails?.subject?.id || testDetails?.subject || '',
      topic: testDetails?.topics?.[0]?.id || testDetails?.topics?.[0] || '',
      sub_topic: testDetails?.sub_topics?.[0]?.id || testDetails?.sub_topics?.[0] || ''
    };

    const updatedList = [...questionsList];
    if (currentQIndex < updatedList.length) {
      updatedList[currentQIndex] = newQuestion;
    } else {
      updatedList.push(newQuestion);
    }
    
    setQuestionsList(updatedList);
    alert(`Question ${currentQIndex + 1} saved locally!`);
    
    // Auto-advance to next blank question if we are at the end
    if (currentQIndex === updatedList.length - 1) {
      setCurrentQIndex(updatedList.length);
      setQuestionText('');
      setOptions([
        { id: 1, text: '' },
        { id: 2, text: '' },
        { id: 3, text: '' },
        { id: 4, text: '' },
      ]);
      setCorrectOptionId(1);
      setSolution('');
    }
  };

  const loadQuestionIntoForm = (index: number) => {
    if (index >= 0 && index < questionsList.length) {
      const q = questionsList[index];
      setQuestionText(q.question);
      setOptions([
        { id: 1, text: q.option1 },
        { id: 2, text: q.option2 },
        { id: 3, text: q.option3 },
        { id: 4, text: q.option4 },
      ]);
      setCorrectOptionId(parseInt(q.correct_option.replace('option', '')));
      setSolution(q.explanation || '');
      setDifficulty(q.difficulty || 'medium');
    } else {
      // Load blank
      setQuestionText('');
      setOptions([
        { id: 1, text: '' },
        { id: 2, text: '' },
        { id: 3, text: '' },
        { id: 4, text: '' },
      ]);
      setCorrectOptionId(1);
      setSolution('');
    }
    setCurrentQIndex(index);
  };

  const handleNextSubmit = async () => {
    if (!testId) {
      setError("No Test ID found. Cannot create questions.");
      return;
    }
    if (questionsList.length === 0) {
      setError("Please add and save at least one question before proceeding.");
      return;
    }

    setLoading(true);
    try {
      await api.questions.bulkCreate(questionsList);
      router.push(`/create-test/schedule?testId=${testId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to submit questions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header and Breadcrumbs */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
          <span>Test Creation</span>
          <span className="mx-2">/</span>
          <span>Create Test</span>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-text-primary)] font-medium">Add Questions</span>
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
            <div className="flex items-center gap-4 text-[var(--color-text-secondary)] text-sm">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {testDetails?.total_time || 0} Min</span>
              <span className="flex items-center gap-1.5"><HelpCircle className="w-4 h-4" /> {testDetails?.total_questions || 0} Q's</span>
              <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> {testDetails?.total_marks || 0} Marks</span>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">{error}</div>}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Question {currentQIndex + 1}</h3>
        <span className="text-sm text-[var(--color-text-secondary)]">Total Saved: {questionsList.length}</span>
      </div>

      {/* Editor */}
      <div className="border border-[var(--color-border-light)] rounded-lg overflow-hidden mb-8 bg-[var(--color-surface)]">
        <div className="flex items-center gap-3 p-2 border-b border-[var(--color-border-light)] bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
          <Bold className="w-4 h-4 cursor-pointer hover:text-[var(--color-text-primary)]" />
          <Italic className="w-4 h-4 cursor-pointer hover:text-[var(--color-text-primary)]" />
          <Underline className="w-4 h-4 cursor-pointer hover:text-[var(--color-text-primary)]" />
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <LinkIcon className="w-4 h-4 cursor-pointer hover:text-[var(--color-text-primary)]" />
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <List className="w-4 h-4 cursor-pointer hover:text-[var(--color-text-primary)]" />
          <ListOrdered className="w-4 h-4 cursor-pointer hover:text-[var(--color-text-primary)]" />
          <ImageIcon className="w-4 h-4 cursor-pointer hover:text-[var(--color-text-primary)]" />
        </div>
        <div className="relative">
          <textarea 
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full h-32 p-4 text-sm focus:outline-none resize-none placeholder-gray-400 bg-transparent text-[var(--color-text-primary)]"
            placeholder="Type question here"
          ></textarea>
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
              <div className="flex-1 relative border border-[var(--color-border-light)] rounded-md overflow-hidden bg-[var(--color-surface)]">
                <input 
                  type="text" 
                  placeholder={`Option ${opt.id}`} 
                  value={opt.text}
                  onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                  className="w-full py-2.5 px-4 text-sm focus:outline-none placeholder-gray-400 bg-transparent text-[var(--color-text-primary)]" 
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] italic">Select the radio button next to the correct option.</p>
      </div>

      {/* Solution */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Add Solution (Optional)</h4>
        <div className="space-y-4 mb-4">
          <div className="relative border border-[var(--color-border-light)] rounded-md overflow-hidden bg-[var(--color-surface)]">
            <textarea 
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="w-full h-24 p-4 text-sm focus:outline-none resize-none placeholder-gray-400 bg-transparent text-[var(--color-text-primary)]"
              placeholder="Type explanation here"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Pagination Controls & Save */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-6 text-[var(--color-text-muted)]">
          <button 
            disabled={currentQIndex === 0} 
            onClick={() => loadQuestionIntoForm(currentQIndex - 1)}
            className="flex items-center gap-1 hover:text-[var(--color-text-primary)] disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          <span className="font-medium text-sm">{currentQIndex + 1}</span>
          <button 
            disabled={currentQIndex >= questionsList.length} 
            onClick={() => loadQuestionIntoForm(currentQIndex + 1)}
            className="flex items-center gap-1 hover:text-[var(--color-text-primary)] disabled:opacity-50"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <button onClick={handleSaveCurrentQuestion} className="px-6 py-2 bg-[var(--color-brand-light)] text-[var(--color-brand-dark)] text-sm font-medium rounded-md hover:bg-blue-100 transition-colors">
          Save Question
        </button>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between border-t border-[var(--color-border-light)] pt-6 mt-6 pb-20">
        <Link href="/create-test">
          <button className="px-6 py-2.5 rounded-md text-[var(--color-text-primary)] bg-[var(--color-surface-hover)] border border-[var(--color-border-light)] font-medium text-sm transition-colors hover:bg-[var(--color-border-light)]">
            Back
          </button>
        </Link>
        <button onClick={handleNextSubmit} disabled={loading} className="px-10 py-2.5 rounded-md text-white bg-[#6b8cff] hover:bg-blue-600 disabled:bg-blue-400 font-medium text-sm transition-colors shadow-sm">
          {loading ? 'Submitting...' : 'Submit & Next'}
        </button>
      </div>
    </div>
  );
}
