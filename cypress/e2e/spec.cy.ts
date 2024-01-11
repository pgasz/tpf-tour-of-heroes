describe('Contains header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should navigate to Google login on click', () => {
    cy.get('h1').should('contain', 'Tour of Heroes');
  });
});
