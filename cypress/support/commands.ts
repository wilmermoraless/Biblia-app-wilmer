/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      loginWithGoogle(): Chainable<void>
    }
  }
}

Cypress.Commands.add('loginWithGoogle', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('user', JSON.stringify({
      uid: 'test-uid',
      email: 'test@gmail.com',
      displayName: 'Test User'
    }))
  })
  cy.visit('/')
})

export {}