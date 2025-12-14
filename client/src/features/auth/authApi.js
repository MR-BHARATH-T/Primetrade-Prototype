import { apiFetch } from '../../lib/apiClient';

export function registerApi(payload) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function loginApi(payload) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function logoutApi() {
  return apiFetch('/auth/logout', {
    method: 'POST'
  });
}

export function getMeApi() {
  return apiFetch('/users/me');
}
