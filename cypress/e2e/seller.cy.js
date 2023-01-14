/// <reference types="Cypress" />
import * as homepage from "../support/homepage_helper"
describe('Reebelo critical case - seller', () => {
  var phoneType = 'iPhone 11 64GB';
  var IMEI = '12345678'

  beforeEach(() =>{
    cy.viewport('macbook-11');
    cy.visit(Cypress.config('baseUrl'));
    cy.wait(3000);
    homepage.setSite('australia');
  })

  it('Select the product from home page ', () => {
    Cypress. on('uncaught:exception', (err, runnable) => { return false; });
    // verify and click the selle your device link
    cy.findByRole('link', {name:/Sell Your Device/i}).should('be.visible').click();
    // click selle my phone for cash
    cy.findByRole('link', {name: /Sell My Phone for Cash right-arrow/i}).should('be.visible').click();
    // select phone 
    cy.findByRole('combobox').click();
    cy.findByRole('searchbox').type(phoneType+'{enter}');
    // select personal phone
    cy.findByLabelText('Personal Phone').click({force: true});
    // click next to next page
    cy.findByRole('button', {name: /next/i}).should('be.visible').click();
    // select condition 
    cy.findByRole('tab', {name: /as new/i}).should('be.visible').click();
    // enter the IMEI
    cy.get('input#orderitem-imei').type(IMEI);
    // click to next page
    cy.findByRole('button', {name: /next step/i}).should('be.visible').click();
    // verify the phone details on confirmation page
    cy.findByRole('heading', {name: 'Confirm Your Details'}).should('be.visible');
    cy.contains(phoneType);
    cy.contains(IMEI);
  });
})