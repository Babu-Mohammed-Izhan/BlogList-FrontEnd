/* eslint-disable no-undef */
describe('Bloglist', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
        const user = {
            name: 'Izhan',
            username: 'izhan1234',
            password: 'izhan'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('Login form is shown', function () {
        cy.contains('log in').click()
        cy.contains('Log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('log in').click()
            cy.get('#username').type('izhan1234', { force: true })
            cy.get('#password').type('izhan', { force: true })
            cy.get('#login-button').click()

            cy.contains('Izhan logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('log in').click()
            cy.get('#username').type('root', { force: true })
            cy.get('#password').type('root', { force: true })
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.contains('log in').click()
            cy.login({ username: 'izhan1234', password: 'izhan' })
        })

        it('A blog can be created', function () {
            cy.contains('Create New Blog').click()
            cy.get('#title').type('this is a title')
            cy.get('#author').type('izhan')
            cy.get('#url').type('this is a url')
            cy.contains('Save').click()

            cy.contains('this is a title')
            cy.contains('izhan')
            cy.contains('this is a url')
        })

        it('A user can like a blog', function () {
            cy.createBlog({ title: 'this is a title', author: 'izhan', url: "this is a url" })
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1')
        })

        it('A User can delete a blog', function () {
            cy.createBlog({ title: 'this is a title', author: 'izhan', url: "this is a url" })
            cy.contains('view').click()
            cy.contains('Delete').click()

            cy.on('window:confirm', (str) => {
                expect(str).to.equal('Remove blog this is a title by izhan')
            })
            cy.on('window:confirm', () => true)

            cy.get('.message')
                .should('contain', 'blog this is a title by izhan has been deleted')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
        })
    })
})