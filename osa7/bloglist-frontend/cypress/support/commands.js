// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
  })
})

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
  cy.contains('new blog').click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.contains('create').click()
})


Cypress.Commands.add('likeBlog', ({ id, likes }) => {
  cy.get(id)
    .contains('view')
    .click()

  for (var i = 0; i < likes; i++) {
    cy.contains('like').click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

  }
  cy.contains('hide').click()


})