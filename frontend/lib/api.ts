const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API call failed');
  }

  return response.json();
}

export async function signup(name: string, email: string, password: string, learningPath: string) {
  return apiCall('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, learningPath }),
  });
}

export async function login(email: string, password: string) {
  return apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getUserProfile() {
  return apiCall('/users/profile');
}

export async function getUserProgress() {
  return apiCall('/users/progress');
}

export async function getDSATopics() {
  return apiCall('/dsa/topics');
}

export async function getFSDPaths() {
  return apiCall('/fsd/paths');
}

export async function askAITutor(message: string, context: string) {
  return apiCall('/ai/tutor', {
    method: 'POST',
    body: JSON.stringify({ message, context }),
  });
}

export async function startMockInterview(topic: string, difficulty: string) {
  return apiCall('/ai/interview', {
    method: 'POST',
    body: JSON.stringify({ topic, difficulty }),
  });
}
