describe("Autenticación", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    Cypress.config('baseUrl', 'http://localhost:3000');
  });

  it("debe redirigir a la página de login si no hay usuario", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
  });

  it("debe mostrar los botones de autenticación social", () => {
    cy.visit("/login");
    cy.get("button").contains("Log in with Google").should("be.visible");
    cy.get("button").contains("Log in with GitHub").should("be.visible");
    cy.get("button").contains("Log in with Facebook").should("be.visible");
  });

  it("debe mostrar el formulario de email/password", () => {
    cy.visit("/login");
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
    cy.get("button").contains("Login").should("be.visible");
  });

  it("debe permitir cerrar sesión", () => {
    // Primero simulamos login
    cy.loginWithGoogle();
    cy.visit("/");
    // Luego cerramos sesión
    cy.contains("button", "Logout").click();
    cy.url().should("include", "/login");
  });
});
