import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface Question {
  id?: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_option: string;
  explanation?: string;
  difficulty?: string;
}

interface TestPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  testName: string;
}

export function TestPreviewModal({ isOpen, onClose, questions, testName }: TestPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-6 md:p-12 overflow-hidden">
      <div className="bg-[var(--color-bg-main)] w-full max-w-5xl max-h-full rounded-2xl shadow-2xl flex flex-col border border-[var(--color-border-light)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-light)] bg-[var(--color-surface)]">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{testName || 'Untitled Test'}</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Student Preview Mode • {questions.length} Questions</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-gray-50 dark:bg-gray-900/30">
          {questions.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-muted)]">
              No questions added to this test yet.
            </div>
          ) : (
            questions.map((q, index) => (
              <div key={index} className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-light)] p-6 shadow-sm">
                
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand-primary)] font-bold text-sm">
                      {index + 1}
                    </span>
                    <div 
                      className="text-lg font-semibold text-[var(--color-text-primary)] prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: q.question }}
                    />
                  </div>
                  {q.difficulty && (
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                    </span>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-3 mt-6 ml-11">
                  {[
                    { id: 'option1', text: q.option1 },
                    { id: 'option2', text: q.option2 },
                    { id: 'option3', text: q.option3 },
                    { id: 'option4', text: q.option4 },
                  ].map((opt, oIndex) => {
                    const isCorrect = q.correct_option === opt.id;
                    return (
                      <div 
                        key={opt.id}
                        className={`p-3 rounded-lg border text-sm flex items-center gap-3 ${
                          isCorrect 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                            : 'border-[var(--color-border-light)] text-[var(--color-text-secondary)] bg-[var(--color-bg-main)]'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isCorrect ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'
                        }`}>
                          {isCorrect && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span dangerouslySetInnerHTML={{ __html: opt.text }} />
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="mt-6 ml-11 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                    <h4 className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1 uppercase tracking-wider">Explanation</h4>
                    <div 
                      className="text-sm text-blue-900 dark:text-blue-200 prose dark:prose-invert max-w-none prose-sm"
                      dangerouslySetInnerHTML={{ __html: q.explanation }}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
