beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {

        cy.get('#username').type('Altsaar')
        cy.get('#email').type('katlinaltsaar@gmail.com')
        cy.get('input[name="name"]').type('Kaetlin')
        cy.get('#lastName').type('Altsaar')
        cy.get('[data-testid="phoneNumberTestId"]').type('111222333')

        cy.get('input[name="password"]').type('Imbad@passwords')
        cy.get('[name="confirm"]').type('Iambadatpasswords')
        cy.get('h2').contains('Password').click()
        cy.window().scrollTo('bottom')

        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('#success_message').should('not.be.visible')
        cy.get('.submit_button').should('be.disabled')
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')

        cy.get('[name="confirm"]').scrollIntoView()
        cy.get('[name="confirm"]').clear().type('Imbad@passwords')
        cy.get('h2').contains('Password').click()

        cy.get('button.submit_button').should('be.enabled').click()
        cy.get('#password_error_message').should('be.not.visible')
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with all fields added', () => {
        inputValidData('Kaetlin')
        cy.get('#cssFavLanguage').click()
        cy.get('#vehicle3').click()
        cy.get('#cars').select('Volvo')
        cy.get('#animal').select('Cat')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
        cy.get('#input_error_message').should('not.be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        inputValidData('Kaetlin')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
        cy.get('#input_error_message').should('not.be.visible')
    })

    it('User can not submit form without first name missing', () => {
        cy.get('#username').type('Altsaar')
        cy.get('#email').type('katlinaltsaar@gmail.com')
        //first name missing; not filled in
        cy.get('#lastName').type('Altsaar')
        cy.get('[data-testid="phoneNumberTestId"]').type('111222333')
        cy.get('#password').type('MyPass')
        cy.get('#confirm').type('MyPass')
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('not.be.visible')
    })
})

describe('Section 2: Visual tests', () => {
    it('Check that cerebrum_hub_logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('#logo').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
        cy.get('img').invoke('width').should('be.lessThan', 180)
            .and('be.greaterThan', 150)
    })

    it('My test for second picture height', () => {
        cy.log('Will check [data-cy="cypress_logo.png"] source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 100)
            .and('be.greaterThan', 75)
    })

    it('My test for second picture width', () => {
        cy.log('Will check [data-cy="cypress_logo.png"] source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 150)
            .and('be.greaterThan', 100)
    });

    it('Check navigation part 1', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    });

    it('Check navigation part 2', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
    })

    it('Check that car dropdown list is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.get('#cars').children().should('have.length', 4)

        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').eq(1).should('have.text', 'Saab')
        cy.get('#cars').find('option').eq(2).should('have.text', 'Opel')
        cy.get('#cars').find('option').eq(3).should('have.text', 'Audi')
    })
 
    it('Check that animal dropdown list is correct', () => {
        cy.screenshot('Full page screenshot')
        cy.get('#animal').find('option').should('have.length', 6)

        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
    })
    })

    function inputValidData(username) {
        cy.log('Username will be filled')
        cy.get('input[data-testid="user"]').type(username)
        cy.get('#email').type('validemail@yeap.com')
        cy.get('[data-cy="name"]').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('#password').type('MyPass')
        cy.get('#confirm').type('MyPass')
        cy.get('h2').contains('Password').click()
    }