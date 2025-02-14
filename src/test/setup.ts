import '@testing-library/jest-dom';
import { vi } from 'vitest'

// Mock de Firebase Auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  })),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
  initializeAuth: vi.fn(),
  GoogleAuthProvider: vi.fn().mockImplementation(() => ({
    addScope: vi.fn(),
    setCustomParameters: vi.fn(),
  })),
  GithubAuthProvider: vi.fn().mockImplementation(() => ({
    addScope: vi.fn(),
    setCustomParameters: vi.fn(),
  })),
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn(),
}))

// Mock de Firebase App
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
  getApp: vi.fn(),
})) 