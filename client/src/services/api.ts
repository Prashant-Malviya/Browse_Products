import axios from 'axios'
import { API_BASE_URL } from '@/constants'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/** Normalizes Axios/network errors into a single human-readable message. */
export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (axios.isAxiosError(error)) {
    const serverMessage = (error.response?.data as { message?: string } | undefined)?.message
    if (serverMessage) return serverMessage
    if (error.code === 'ECONNABORTED') return 'The request timed out. Is the backend running?'
    if (!error.response) return 'Could not reach the backend. Is it running and is the URL correct?'
    return `Request failed with status ${error.response.status}.`
  }
  return fallback
}
