/**
 * Preproute API Service Layer
 * 
 * Configured according to the official Frontend Developer Task specification.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.preproute.com/v1';

/**
 * Generic fetch wrapper to handle JSON, headers, and errors
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  // To enable real API calls, uncomment this block and remove the mock code below.
  /*
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred with the API request');
  }

  return data;
  */

  // --- MOCK IMPLEMENTATION FOR UI DEVELOPMENT ---
  console.log(`[Mock API] ${options.method || 'GET'} ${endpoint}`, options.body ? JSON.parse(options.body as string) : '');
  return Promise.resolve({ success: true, data: {}, message: 'Mock API response' });
}

export const api = {
  // ==========================================
  // 1. Authentication
  // ==========================================
  auth: {
    login: async (credentials: { userId: string; password: string }) => {
      // return fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
      return Promise.resolve({
        success: true,
        data: { token: 'mock-jwt-token', user: { name: 'Alex Wando', role: 'admin' } }
      });
    },
    logout: () => {
      // if (typeof window !== 'undefined') localStorage.removeItem('token');
      console.log('Logged out');
    }
  },

  // ==========================================
  // 2-4 & 11. Subjects, Topics, Sub-topics
  // ==========================================
  taxonomy: {
    getSubjects: async () => {
      // return fetchAPI('/subjects');
      return Promise.resolve({ success: true, data: [{ id: 'sub-uuid', name: 'Mathematics' }] });
    },
    getTopicsBySubject: async (subjectId: string) => {
      // return fetchAPI(`/topics/subject/${subjectId}`);
      return Promise.resolve({ success: true, data: [{ id: 'top-uuid', name: 'Algebra', subject_id: subjectId }] });
    },
    getSubTopicsByTopic: async (topicId: string) => {
      // return fetchAPI(`/sub-topics/topic/${topicId}`);
      return Promise.resolve({ success: true, data: [{ id: 'subtop-uuid', name: 'Linear Equations', topic_id: topicId }] });
    },
    getSubTopicsByMultipleTopics: async (topicIds: string[]) => {
      // return fetchAPI('/sub-topics/multi-topics', { method: 'POST', body: JSON.stringify({ topicIds }) });
      return Promise.resolve({ success: true, data: [] });
    }
  },

  // ==========================================
  // 5-8 & 10. Tests
  // ==========================================
  tests: {
    getAll: async () => {
      // return fetchAPI('/tests');
      return Promise.resolve({ success: true, data: [] });
    },
    getById: async (id: string) => {
      // return fetchAPI(`/tests/${id}`);
      return Promise.resolve({ success: true, data: { id, name: 'Sample Test', subject: 'Mathematics' } });
    },
    create: async (testData: {
      name: string;
      type: string;
      subject: string;
      topics: string[];
      sub_topics: string[];
      correct_marks: number;
      wrong_marks: number;
      unattempt_marks: number;
      difficulty: string;
      total_time: number;
      total_marks: number;
      total_questions: number;
      status: string | null;
    }) => {
      // return fetchAPI('/tests', { method: 'POST', body: JSON.stringify(testData) });
      return Promise.resolve({ success: true, data: { id: 'new-test-uuid', ...testData }, message: "Test created successfully" });
    },
    update: async (id: string, updateData: {
      name?: string;
      questions?: string[];
      total_questions?: number;
      total_marks?: number;
    }) => {
      // return fetchAPI(`/tests/${id}`, { method: 'PUT', body: JSON.stringify(updateData) });
      return Promise.resolve({ success: true, data: updateData });
    },
    publish: async (id: string) => {
      // return fetchAPI(`/tests/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'live' }) });
      return Promise.resolve({ success: true, message: "Test published successfully" });
    }
  },

  // ==========================================
  // 9 & 12. Questions
  // ==========================================
  questions: {
    bulkCreate: async (questions: {
      type: string;
      question: string;
      option1: string;
      option2: string;
      option3: string;
      option4: string;
      correct_option: string;
      explanation?: string;
      difficulty?: string;
      test_id: string;
    }[]) => {
      // return fetchAPI('/questions/bulk', { method: 'POST', body: JSON.stringify({ questions }) });
      return Promise.resolve({ success: true, data: [{ id: 'q-uuid' }], message: `Successfully created ${questions.length} questions` });
    },
    fetchBulk: async (questionIds: string[]) => {
      // return fetchAPI('/questions/fetchBulk', { method: 'POST', body: JSON.stringify({ question_ids: questionIds }) });
      return Promise.resolve({ success: true, data: [] });
    }
  }
};
