const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/v1';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function emitUnauthorized() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('auth:unauthorized'));
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    credentials: 'include'
  });

  if (res.status === 204) return null;

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (res.status === 401) {
    emitUnauthorized();
  }

  if (!res.ok) {
    const message = (data && data.message) || 'Request failed';
    throw new ApiError(message, res.status);
  }

  return data;
}
