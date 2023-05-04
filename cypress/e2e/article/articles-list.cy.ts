describe('Пользователь заходит на страницу со списком статей', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('articles');
    });
  });

  describe('Работа с API', () => {
    it('и статьи успешно подгружаются', () => {
      cy.getByTestId('ArticlesPage').should('exist');
      cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });
  });

  describe('Работа на фикстурах (Моках)', () => {
    it('На стабах', () => {
      cy.intercept('GET', '**/articles?/*', {
        fixture: 'articles.json',
      });
      cy.getByTestId('ArticlesPage').should('exist');
      cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });
  });

  it.skip('Пример заскипанного теста', () => {
    cy.getByTestId('ArticlesPage').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    cy.get('sdfsdff').should('exist');
  });
});
