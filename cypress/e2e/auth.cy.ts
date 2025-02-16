describe("Autenticación", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it("debe redirigir a la página de login si no hay usuario", () => {
    cy.wait(1000);
    cy.url().should('include', '/login');
  });

  it("debe mostrar los botones de autenticación social", () => {
    cy.visit('/login');
    cy.get('[data-testid="google-auth-button"]').should('exist');
    cy.get('[data-testid="github-auth-button"]').should('exist');
  });

  it("debe mostrar el formulario de email/password", () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('[data-testid="login-button"]').should('exist');
  });

  it("debe permitir cerrar sesión", () => {
    cy.visit('/login');
    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
    });
    cy.visit('/');
    cy.get('[data-testid="logout-button"]').should('contain', 'Logout');
  });
});
