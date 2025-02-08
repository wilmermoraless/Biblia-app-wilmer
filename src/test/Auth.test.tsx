import { describe, test, it, expect, beforeEach, vi } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import  Auth  from '../components/Auth';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

vi.mock('firebase/auth', () => ({
    GoogleAuthProvider: vi.fn(),
    FacebookAuthProvider: vi.fn(),
    GithubAuthProvider: vi.fn(),
    signInWithPopup: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn()
}));

const RenderComponent = () => render(
    <MemoryRouter>
        <Auth />
    </MemoryRouter>
);

describe('Testing de Auth.tsx', () => {
    beforeEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('Debe renderizar el componente correctamente', () => {
        const { baseElement } = RenderComponent();
        expect(baseElement).toMatchSnapshot();
    });

    test('Debe renderizar el título "Login"', () => {
        const { getByText } = RenderComponent();
        expect(getByText(/Login/i)).toBeTruthy();
    });

    test('Debe tener un botón para iniciar sesión con Google', () => {
        const { getByText } = RenderComponent();
        expect(getByText(/Log in with Google/i)).toBeTruthy();
    });

    test('Debe tener un botón para iniciar sesión con Facebook', () => {
        const { getByText } = RenderComponent();
        expect(getByText(/Log in with Facebook/i)).toBeTruthy();
    });

    test('Debe tener un botón para iniciar sesión con GitHub', () => {
        const { getByText } = RenderComponent();
        expect(getByText(/Log in with GitHub/i)).toBeTruthy();
    });

    test('Debe ejecutar la función de autenticación con Google al hacer clic en el botón correspondiente', async () => {
        const { getByText } = RenderComponent();
        const googleButton = getByText(/Log in with Google/i);
        
        await fireEvent.click(googleButton);
        expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider));
    });

    test('Debe ejecutar la función de autenticación con Facebook al hacer clic en el botón correspondiente', async () => {
        const { getByText } = RenderComponent();
        const facebookButton = getByText(/Log in with Facebook/i);
        
        await fireEvent.click(facebookButton);
        expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(FacebookAuthProvider));
    });

    test('Debe ejecutar la función de autenticación con GitHub al hacer clic en el botón correspondiente', async () => {
        const { getByText } = RenderComponent();
        const githubButton = getByText(/Log in with GitHub/i);
        
        await fireEvent.click(githubButton);
        expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GithubAuthProvider));
    });

    test('Debe permitir ingresar un email y una contraseña', () => {
        const { getByPlaceholderText } = RenderComponent();
        
        const emailInput = getByPlaceholderText(/Email/i);
        const passwordInput = getByPlaceholderText(/Password/i);
        
        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
    });

    test('Debe ejecutar la función de login con email y contraseña', async () => {
        const { getByPlaceholderText, getByText } = RenderComponent();
        
        const emailInput = getByPlaceholderText(/Email/i);
        const passwordInput = getByPlaceholderText(/Password/i);
        const loginButton = getByText(/Login/i);
        
        await fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        await fireEvent.change(passwordInput, { target: { value: 'password123' } });
        await fireEvent.click(loginButton);
        
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    });

    test('Debe ejecutar la función de registro con email y contraseña', async () => {
        const { getByPlaceholderText, getByText } = RenderComponent();
        
        const emailInput = getByPlaceholderText(/Email/i);
        const passwordInput = getByPlaceholderText(/Password/i);
        const signUpButton = getByText(/Sign up!/i);
        
        await fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        await fireEvent.change(passwordInput, { target: { value: 'password123' } });
        await fireEvent.click(signUpButton);
        
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    });

    test('Debe ejecutar la función de logout al hacer clic en el botón correspondiente', async () => {
        const { getByText } = RenderComponent();
        const logoutButton = getByText(/Logout/i);
        
        await fireEvent.click(logoutButton);
        expect(signOut).toHaveBeenCalledWith(auth);
    });
});