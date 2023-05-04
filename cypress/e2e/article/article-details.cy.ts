let currentArticleId = '';

describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.log(JSON.stringify(article));
      cy.visit(`articles/${article.id}`);
    });
  });

  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });

  describe('Работа с API', () => {
    it('И видит содержимое статьи', () => {
      cy.getByTestId('ArticleDetails.Info').should('exist');
    });

    it('И видит список рекомендаций статьи', () => {
      cy.getByTestId('ArticleRecommendationsList').should('exist');
    });

    it('И оставляет комментарий', () => {
      cy.getByTestId('ArticleDetails.Info');
      cy.getByTestId('AddCommentForm').scrollIntoView();
      cy.addComment('text');
      cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });

    it('И ставит оценку', () => {
      cy.getByTestId('ArticleDetails.Info');
      cy.getByTestId('RatingCard').scrollIntoView();
      cy.setRate(5, 'feedback');
      cy.get('[data-selected=true]').should('have.length', 5);
    });
  });

  describe('Работа на стабах (Моках)', () => {
    it('И ставит оценку', () => {
      cy.intercept('GET', '**/articles/*', {
        fixture: 'article-details.json',
      });
      cy.getByTestId('ArticleDetails.Info');
      cy.getByTestId('RatingCard').scrollIntoView();
      cy.setRate(5, 'feedback');
      cy.get('[data-selected=true]').should('have.length', 5);
    });
  });
});
