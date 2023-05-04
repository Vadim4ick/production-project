/* eslint-disable @typescript-eslint/no-namespace */

export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: {
      Authorization: 'asdas',
    },
    body: {
      id: '4',
      first: 'test',
      lastname: 'user',
      age: '20',
      currency: 'EUR',
      country: 'George',
      city: 'Краснокамск',
      username: 'testuser',
      avatar: 'https://kolchvesti.ru/wp-content/uploads/2021/07/haker.jpg',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
