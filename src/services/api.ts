/**
 * Preproute API Service Layer
 * 
 * Configured according to the official Frontend Developer Task specification.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin-moderator-backend-staging.up.railway.app/api';

/**
 * Generic fetch wrapper to handle JSON, headers, and errors
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok || (data.success === false) || (data.status === 'error')) {
    let errorMsg = data.message || 'An error occurred with the API request';
    if (data.errors) {
      errorMsg += ': ' + (typeof data.errors === 'string' ? data.errors : JSON.stringify(data.errors));
    } else if (data.error && typeof data.error !== 'boolean') {
      errorMsg += ': ' + (typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
    } else if (data.detail) {
      errorMsg += ': ' + (typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail));
    }
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // ==========================================
  // 1. Authentication
  // ==========================================
  auth: {
    login: async (credentials: { userId: string; password: string }) => {
      return fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    },
    logout: () => {
      if (typeof window !== 'undefined') localStorage.removeItem('token');
      console.log('Logged out');
    }
  },

  // ==========================================
  // 2-4 & 11. Subjects, Topics, Sub-topics
  // ==========================================
  taxonomy: {
    getSubjects: async () => {
      return fetchAPI('/subjects');
    },
    getTopicsBySubject: async (subjectId: string) => {
      return fetchAPI(`/topics/subject/${subjectId}`);
    },
    getSubTopicsByTopic: async (topicId: string) => {
      return fetchAPI(`/sub-topics/topic/${topicId}`);
    },
    getSubTopicsByMultipleTopics: async (topicIds: string[]) => {
      return fetchAPI('/sub-topics/multi-topics', { method: 'POST', body: JSON.stringify({ topicIds }) });
    }
  },

  // ==========================================
  // 5-8 & 10. Tests
  // ==========================================
  tests: {
    getAll: async () => {
      return fetchAPI('/tests');
    },
    getById: async (id: string) => {
      return fetchAPI(`/tests/${id}`);
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
      return fetchAPI('/tests', { method: 'POST', body: JSON.stringify(testData) });
    },
    update: async (id: string, updateData: any) => {
      return fetchAPI(`/tests/${id}`, { method: 'PUT', body: JSON.stringify(updateData) });
    },
    publish: async (id: string, scheduledDate?: string) => {
      const payload: any = { status: scheduledDate ? 'scheduled' : 'live' };
      if (scheduledDate) {
        payload.scheduled_at = scheduledDate;
      }
      return fetchAPI(`/tests/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
    },
    unpublish: async (id: string) => {
      return fetchAPI(`/tests/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'unpublished' }) });
    },
    delete: async (id: string) => {
      return fetchAPI(`/tests/${id}`, { method: 'DELETE' });
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
      return fetchAPI('/questions/bulk', { method: 'POST', body: JSON.stringify({ questions }) });
    },
    fetchBulk: async (questionIds: string[]) => {
      return fetchAPI('/questions/fetchBulk', { method: 'POST', body: JSON.stringify({ question_ids: questionIds }) });
    }
  }
};

