import { apiFetch } from '../../lib/apiClient';

export function listTasksApi({ search = '', status = '' } = {}) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status) params.set('status', status);
  return apiFetch(`/tasks?${params.toString()}`);
}

export function createTaskApi(payload) {
  return apiFetch('/tasks', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function updateTaskApi(id, payload) {
  return apiFetch(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  });
}

export function deleteTaskApi(id) {
  return apiFetch(`/tasks/${id}`, {
    method: 'DELETE'
  });
}
