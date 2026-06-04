"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { api } from '@/services/api';

export default function CreateTestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get('testId');
  const isEditing = !!testId;
  
  // State for taxonomy data
  const [subjects, setSubjects] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [subtopics, setSubtopics] = useState<any[]>([]);
  
  // Form State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [type, setType] = useState('chapterwise');
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [wrongMarks, setWrongMarks] = useState(-1);
  const [unattemptMarks, setUnattemptMarks] = useState(0);
  const [correctMarks, setCorrectMarks] = useState(5);
  const [totalQuestions, setTotalQuestions] = useState('');
  
  const totalMarks = (parseInt(totalQuestions) || 0) * correctMarks;

  // Fetch test details if editing
  useEffect(() => {
    if (isEditing && testId) {
      api.tests.getById(testId).then(res => {
        const test = res.data || res;
        setName(test.name || '');
        setSubject(test.subject?.id || test.subject || '');
        if (test.topics && test.topics.length > 0) setTopic(test.topics[0].id || test.topics[0]);
        if (test.sub_topics && test.sub_topics.length > 0) setSubtopic(test.sub_topics[0].id || test.sub_topics[0]);
        if (test.total_time) setTotalTime(test.total_time.toString());
        if (test.total_questions) setTotalQuestions(test.total_questions.toString());
        if (test.difficulty) setDifficulty(test.difficulty);
        if (test.correct_marks !== undefined) setCorrectMarks(test.correct_marks);
        if (test.wrong_marks !== undefined) setWrongMarks(test.wrong_marks);
        if (test.unattempt_marks !== undefined) setUnattemptMarks(test.unattempt_marks);
        if (test.type) setType(test.type);
      }).catch(console.error);
    }
  }, [testId, isEditing]);

  // Fetch subjects on mount
  useEffect(() => {
    api.taxonomy.getSubjects().then(res => setSubjects(res.data || [])).catch(console.error);
  }, []);

  // Resolve names to UUIDs if editing a test that saved names instead of IDs
  useEffect(() => {
    if (subject && subject.length < 30 && subjects.length > 0) {
      const found = subjects.find(s => s.name === subject);
      if (found) setSubject(found.id);
    }
  }, [subject, subjects]);

  useEffect(() => {
    if (topic && topic.length < 30 && topics.length > 0) {
      const found = topics.find(t => t.name === topic);
      if (found) setTopic(found.id);
    }
  }, [topic, topics]);

  useEffect(() => {
    if (subtopic && subtopic.length < 30 && subtopics.length > 0) {
      const found = subtopics.find(st => st.name === subtopic);
      if (found) setSubtopic(found.id);
    }
  }, [subtopic, subtopics]);

  // Fetch topics when subject changes
  useEffect(() => {
    if (subject && subject.length > 30) {
      api.taxonomy.getTopicsBySubject(subject).then(res => setTopics(res.data || [])).catch(console.error);
    }
  }, [subject]);

  // Fetch subtopics when topic changes
  useEffect(() => {
    if (topic && topic.length > 30) {
      api.taxonomy.getSubTopicsByTopic(topic).then(res => setSubtopics(res.data || [])).catch(console.error);
    }
  }, [topic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const missingFields = [];
    if (!name) missingFields.push('Name of Test');
    if (!subject) missingFields.push('Subject');
    if (!topic) missingFields.push('Topic');
    if (!totalTime) missingFields.push('Duration');
    if (!totalQuestions) missingFields.push('No of Questions');

    if (missingFields.length > 0) {
      setError("Please fill in: " + missingFields.join(', '));
      return;
    }
    
    setLoading(true);
    try {
      const payload: any = {
        name,
        type,
        subject: subject,
        topics: topic ? [topic] : [],
        correct_marks: correctMarks,
        wrong_marks: wrongMarks,
        unattempt_marks: unattemptMarks,
        difficulty,
        total_time: parseInt(totalTime),
        total_questions: parseInt(totalQuestions),
        total_marks: totalMarks,
        status: "draft"
      };

      if (subtopic) {
        payload.sub_topics = [subtopic];
      }
      
      let res;
      if (isEditing && testId) {
        res = await api.tests.update(testId, payload);
      } else {
        res = await api.tests.create(payload);
      }
      
      const returnedId = (res.data && res.data.id) ? res.data.id : (res.id || testId);
      
      if (returnedId) {
        router.push(`/create-test/questions?testId=${returnedId}`);
      } else {
        throw new Error("Test saved but no ID returned.");
      }
    } catch (err: any) {
      const backendError = err.response?.data?.message || err.response?.data?.error || err.response?.data?.detail;
      setError(backendError || err.message || 'Failed to create test');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-8 max-w-5xl mx-auto">
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
        <button type="button" onClick={() => setType('chapterwise')} className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${type === 'chapterwise' ? 'bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'}`}>
          Chapter Wise
        </button>
        <button type="button" onClick={() => setType('pyq')} className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${type === 'pyq' ? 'bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'}`}>
          PYQ
        </button>
        <button type="button" onClick={() => setType('mocktest')} className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${type === 'mocktest' ? 'bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'}`}>
          Mock Test
        </button>
      </div>
      
      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">{error}</div>}

      <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">{isEditing ? 'Edit Test Details' : 'Basic Details'}</h2>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        {/* Subject */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-text-primary)]">Subject <span className="text-red-500">*</span></label>
          <div className="relative">
            <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full appearance-none px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]">
              <option value="" className="text-gray-500">Choose from Drop-down</option>
              {subjects.map((s: any) => (
                <option key={s.id} value={s.id} className="text-[var(--color-text-primary)]">{s.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Name of Test */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-text-primary)]">Name of Test <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name of Test" 
            className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-transparent text-[var(--color-text-primary)] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
          />
        </div>

        {/* Topic */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-text-primary)]">Topic <span className="text-red-500">*</span></label>
          <div className="relative">
            <select disabled={!subject} value={topic} onChange={e => setTopic(e.target.value)} className="w-full appearance-none px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-[var(--color-surface)] text-[var(--color-text-primary)] disabled:opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]">
              <option value="" className="text-gray-500">Choose from Drop-down</option>
              {topics.map((t: any) => (
                <option key={t.id} value={t.id} className="text-[var(--color-text-primary)]">{t.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Sub Topic */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-text-primary)]">Sub Topic</label>
          <div className="relative">
            <select disabled={!topic} value={subtopic} onChange={e => setSubtopic(e.target.value)} className="w-full appearance-none px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-[var(--color-surface)] text-[var(--color-text-primary)] disabled:opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]">
              <option value="" className="text-gray-500">Choose from Drop-down</option>
              {subtopics.map((st: any) => (
                <option key={st.id} value={st.id} className="text-[var(--color-text-primary)]">{st.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-text-primary)]">Duration (Minutes) <span className="text-red-500">*</span></label>
          <input 
            type="number"
            value={totalTime}
            onChange={e => setTotalTime(e.target.value)} 
            placeholder="Enter the time" 
            className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-transparent text-[var(--color-text-primary)] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
          />
        </div>

        {/* Test Difficulty Level */}
        <div className="space-y-2 flex flex-col justify-center">
          <label className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">Test Difficulty Level</label>
          <div className="flex items-center gap-8 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="difficulty" value="easy" checked={difficulty === 'easy'} onChange={() => setDifficulty('easy')} className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">Easy</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="difficulty" value="medium" checked={difficulty === 'medium'} onChange={() => setDifficulty('medium')} className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">Medium</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="difficulty" value="difficult" checked={difficulty === 'difficult'} onChange={() => setDifficulty('difficult')} className="w-4 h-4 accent-[var(--color-brand-primary)] cursor-pointer" />
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
              <input type="number" value={wrongMarks} onChange={e => setWrongMarks(parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-transparent text-[var(--color-text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
            </div>
          </div>
          <div className="space-y-2 w-full md:w-32">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">Unattempted</label>
            <div className="relative">
              <input type="number" value={unattemptMarks} onChange={e => setUnattemptMarks(parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-transparent text-[var(--color-text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
            </div>
          </div>
          <div className="space-y-2 w-full md:w-32">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">Correct Answer</label>
            <div className="relative">
              <input type="number" value={correctMarks} onChange={e => setCorrectMarks(parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-transparent text-[var(--color-text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
            </div>
          </div>
          
          <div className="hidden md:block flex-1"></div>
          
          <div className="space-y-2 w-full md:w-48">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">No of Questions <span className="text-red-500">*</span></label>
            <input type="number" value={totalQuestions} onChange={e => setTotalQuestions(e.target.value)} placeholder="Ex: 50" className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] bg-transparent text-[var(--color-text-primary)] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" />
          </div>
          <div className="space-y-2 w-full md:w-48">
            <label className="text-sm font-semibold text-[var(--color-text-secondary)]">Total Marks</label>
            <input type="text" value={`${totalMarks} Marks`} disabled className="w-full px-4 py-2.5 rounded-md border border-[var(--color-border-light)] text-[var(--color-text-secondary)] text-sm bg-[var(--color-surface-hover)] opacity-60" />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col-reverse md:flex-row justify-end gap-4 border-t border-[var(--color-border-light)] pt-6 mt-6 pb-12">
        <Link href="/dashboard" className="w-full md:w-auto">
          <button type="button" className="w-full px-8 py-2.5 rounded-md text-[var(--color-text-primary)] bg-[var(--color-surface-hover)] border border-[var(--color-border-light)] font-medium text-sm hover:bg-[var(--color-border-light)] transition-colors">
            Cancel
          </button>
        </Link>
        <button type="submit" disabled={loading} className="w-full md:w-auto px-10 py-2.5 rounded-md text-white bg-[#6b8cff] hover:bg-blue-600 disabled:bg-blue-400 font-medium text-sm transition-colors shadow-sm flex justify-center">
          {loading ? 'Saving...' : 'Next'}
        </button>
      </div>
    </form>
  );
}
