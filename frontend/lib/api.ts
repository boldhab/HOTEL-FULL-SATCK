import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchCollection<T>(endpoint: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
  } catch {
    return [];
  }
}
