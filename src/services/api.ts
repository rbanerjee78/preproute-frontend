/**
 * Preproute API Service Layer
 * 
 * This file contains all the boilerplate functions for API integration.
 * Once the backend endpoints are back online, simply replace the `BASE_URL` 
 * and remove the mock `Promise.resolve` returns to make actual fetch requests.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.preproute.com/v1';

/**
 * Generic fetch wrapper to handle JSON and errors consistently
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  // Uncomment the lines below to enable actual API calls
  /*
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred with the API request');
  }

  return response.json();
  */

  // Temporary mock implementation for UI development
  console.log(`[Mock API Call] ${options.method || 'GET'} ${endpoint}`, options.body ? JSON.parse(options.body as string) : '');
  return Promise.resolve({ success: true, message: 'Mock API response' });
}

export const api = {
  // ==========================================
  // Authentication
  // ==========================================
  auth: {
    login: async (credentials: any) => {
      // return fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
      return Promise.resolve({ token: 'mock-jwt-token', user: { name: 'Alex Wando', role: 'admin' } });
    },
    logout: () => {
      // localStorage.removeItem('token');
      console.log('Logged out');
    }
  },

  // ==========================================
  // Dashboard & Tests
  // ==========================================
  tests: {
    /** Fetch all tests for the dashboard */
    getAll: async (filters?: any) => {
      // const queryParams = new URLSearchParams(filters).toString();
      // return fetchAPI(`/tests?${queryParams}`);
      return Promise.resolve([]);
    },
    
    /** Create a new test (Initial configuration step) */
    create: async (testData: any) => {
      // return fetchAPI('/tests', { method: 'POST', body: JSON.stringify(testData) });
      return Promise.resolve({ id: 'new-test-123', ...testData });
    },

    /** Delete a test */
    delete: async (testId: string | number) => {
      // return fetchAPI(`/tests/${testId}`, { method: 'DELETE' });
      return Promise.resolve({ success: true });
    }
  },

  // ==========================================
  // Questions
  // ==========================================
  questions: {
    /** Save questions mapped to a specific test */
    saveBatch: async (testId: string | number, questionsData: any[]) => {
      // return fetchAPI(`/tests/${testId}/questions`, { 
      //   method: 'POST', 
      //   body: JSON.stringify({ questions: questionsData }) 
      // });
      return Promise.resolve({ success: true, count: questionsData.length });
    }
  },

  // ==========================================
  // Scheduling & Publishing
  // ==========================================
  schedule: {
    /** Publish a test with start/end date and time constraints */
    publish: async (testId: string | number, scheduleData: any) => {
      // return fetchAPI(`/tests/${testId}/publish`, { 
      //   method: 'POST', 
      //   body: JSON.stringify(scheduleData) 
      // });
      return Promise.resolve({ success: true, status: 'Published' });
    }
  }
};
