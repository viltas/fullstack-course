/* eslint-disable cypress/no-unnecessary-waiting */

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Testinen',
      username: 'testi',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)

    const user2 = {
      name: 'Testi Testisen poika',
      username: 'testiJr',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user2)
    cy.visit('http://localhost:3000')
  })


  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')

  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Welcome, Testi Testinen')
    })

    it('fails with incorrect credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('anasalas')
      cy.get('#login-button').click()
      cy.contains('wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Welcome')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testi', password: 'salasana' })

    })

    it('A blog can be created', function() {
      cy.addBlog({ title: 'test title', author: 'test author', url: 'test.test.test' })
      cy.contains('view').click()
      cy.contains('test title test author')
      cy.contains('url: test.test.test')
    })

    it('A blog can be liked', function() {
      cy.addBlog({ title: 'test_title', author: 'test author', url: 'test.test.test' })
      cy.likeBlog({ id: '#test_title', likes: 2 })
      cy.contains('view').click()
      cy.contains('likes: 2')
    })

    it('A blog can be deleted by user who added it', function() {
      cy.addBlog({ title: 'test title', author: 'test author', url: 'test.test.test', })
      cy.contains('logout').click()

      cy.login({ username: 'testiJr', password: 'salasana' })
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.get('html').should('not.contain', 'delete')
      cy.contains('hide').click()

      cy.addBlog({ title: 'test title2', author: 'test author2', url: 'test.test.test2' })

      cy.reload()
      cy.contains('test title2 test author2')
        .contains('view')
        .click()
      cy.contains('delete').click()
      cy.get('html').should('not.contain', 'test title2')

    })

    it('Blogs are ordered by likes', function() {
      cy.addBlog({ title: 'test_title1', author: 'test author1', url: 'test.test.test1' })
      cy.likeBlog({ id: '#test_title1', likes: 3 })

      cy.addBlog({ title: 'test_title2', author: 'test author2', url: 'test.test.test2' })
      cy.likeBlog({ id: '#test_title2', likes: 4 })

      cy.addBlog({ title: 'test_title3', author: 'test author3', url: 'test.test.test3' })
      cy.likeBlog({ id: '#test_title3', likes: 2 })

      cy.addBlog({ title: 'test_title4', author: 'test author4', url: 'test.test.test4' })
      cy.likeBlog({ id: '#test_title4', likes: 1 })

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).should('contain', 'test_title2')
        cy.wrap(blogs[1]).should('contain', 'test_title1')
        cy.wrap(blogs[2]).should('contain', 'test_title3')
        cy.wrap(blogs[3]).should('contain', 'test_title4')

      })
    })

  })


})