// Test setup for vitest
import { expect, beforeEach } from 'vitest'

// Mock DOM APIs that might not be available in test environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock localStorage
const localStorageMock = {
  getItem: (key) => null,
  setItem: (key, value) => {},
  removeItem: (key) => {},
  clear: () => {},
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock console.error for cleaner test output
beforeEach(() => {
  // Reset DOM
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})