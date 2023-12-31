describe('test the home page of search app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('should display a text showing the page direction', () => {
    cy.get('[data-testid="page-dir"]').should('exist')
    cy.get('[data-testid="page-dir"]').should(
      'have.text',
      'Home / Cocktail List'
    )
  })
  it('the page display the letter a on first visit and the first child called A1', () => {
    cy.get('[data-testid="item-display"]').should('exist')
    cy.get('[data-testid="item-display"]')
      .first()
      .should('exist')
      .get('div')
      .and('have.class', 'content')
      .get('div')
      .and('have.class', 'header')
      .contains('A1')
    cy.get('[data-testid="item-display"]').first().contains('A1')
  })
  it('click on an other letter will render new list of cocktail starting with that letter', () => {
    cy.get('.item').should('exist').contains('B').click()
    cy.get('[data-testid="item-display"]').first().contains('B-52')
  })
  it('user type (de) in to search field and tub opened at letter A will show the first item called Alexander', () => {
    cy.get('#search').should('exist')
    cy.get('.item').should('exist').contains('A').click()
    cy.get('#search').type('de')
    cy.get('[data-testid="item-display"]').first().contains('Alexander')
  })
  it('user type (de) in to search field and tub opened at letter A will show the first item called Alexander then press B and show first item Broadside', () => {
    cy.get('#search').should('exist')
    cy.get('.item').should('exist').contains('A').click()
    cy.get('#search').type('de')
    cy.get('[data-testid="item-display"]').first().contains('Alexander')
    cy.get('.item').should('exist').contains('B').click()
    cy.get('[data-testid="item-display"]').first().contains('Broadside')
  })
  it('user type (de) in to search field and tub opened at letter A will show the first item called Alexander, then press B and show first item Broadside, then select Golden dream from the search drop down', () => {
    cy.get('#search').should('exist')
    cy.get('.item').should('exist').contains('A').click()
    cy.get('#search').type('de')
    cy.get('[data-testid="item-display"]').first().contains('Alexander')
    cy.get('.item').should('exist').contains('B').click()
    cy.get('[data-testid="item-display"]').first().contains('Broadside')
    cy.get('.result').should('exist').contains('Golden dream').click()
    cy.get('.single-item-drink').should('exist').contains('Golden dream')
  })
  it('user type (de) in to search field, then pick Golden dream from the search options, then clear out search', () => {
    cy.get('#search').should('exist')
    cy.get('#search').type('de')
    cy.get('.result').should('exist').contains('Golden dream').click()
    cy.get('.single-item-drink').should('exist').contains('Golden dream')
    cy.get('#search').clear()
    cy.get('[data-testid="item-display"]').first().contains('A1')
  })
})
