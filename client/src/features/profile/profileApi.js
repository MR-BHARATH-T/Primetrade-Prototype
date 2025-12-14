import { apiFetch } from '../../lib/apiClient';

export function getProfileApi() {
  return apiFetch('/users/me');
}

export function updateProfileApi(payload) {
  return apiFetch('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(payload)
  });
}
