/// <reference types="Cypress" />
import * as homepage from "../support/homepage_helper"
describe('Reebelo critical case - buyer', () => {
  beforeEach(() =>{
    cy.viewport('macbook-11');
    cy.visit(Cypress.config('baseUrl'));
    cy.wait(3000);
    homepage.setSite('australia');
  })

  it('Select the product from home page ', () => {
    // search box
    cy.findAllByPlaceholderText(/Search by model/i).should('be.visible');
    // inline product menu , only show when page width > 1024
    cy.get('#inline-menu').should('be.visible');
    // click the menu to enter iphone 14 product page
    cy.get('li.menu-item.relative>ul').eq(0).within(()=>{
        cy.findByText("iPhone 14").click({ force: true });
    });
    // verify the iphone 14 product page loads correctly
    cy.findByRole('heading',{name: 'iPhone 14'}).should('be.visible');
  });

  it('Search the keyword from home page to search result page', () => {
    // search box
    cy.findAllByPlaceholderText(/Search by model/i).should('be.visible').type('iphone 14{enter}');
    // verify the search result page land
    cy.title().should('eq','Search results for iphone 14');
  });

  it('Search the product from home page to product page', () => {
    // search box
    cy.findAllByPlaceholderText(/Search by model/i).should('be.visible').type('iphone 14 ');
    cy.get('#e2e-searchbar-search-results>a:nth-of-type(1)').invoke('attr','href').then(($p)=>{
      expect($p).to.contain('Midnight');
    });
    cy.get('#e2e-searchbar-search-results>a:nth-of-type(1)').click();
    cy.findByRole('heading',{name: /COLOR: MIDNIGHT/i}).should('be.visible');
  });

  it('Add to the cart and checkout page', () => {
    cy.visit(Cypress.config('baseUrl') +'collections/apple-iphone-14');
    // verify the default memory usage selected is 128GB
    cy.findByRole('link', {name: '128GB'}).invoke('attr','data-active').should('eq', 'true');
    cy.findByRole('link', {name: '256GB'}).invoke('attr','data-active').should('eq', 'false');
    // select 256GB
    cy.findByRole('link', {name: '256GB'}).click();
    // verify the new select 256GB successfully.
    cy.findByRole('link', {name: '256GB'}).invoke('attr','data-active').should('eq', 'true');
    // verify and click add to cart button
    cy.findByRole('button', {name: 'Add to Cart'}).should('be.visible').click();
    // // verify and click checkout button
    cy.findByRole('link', {name: 'Checkout'}).should('be.visible').click();
    // click continue to shipping
    cy.findByRole('button', {name: /CONTINUE TO SHIPPING/i}).should('be.visible');
  })
})