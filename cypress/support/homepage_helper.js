export function setSite(site) {
    cy.get("body").then(($body) => {
        if($body.find('div>ul.w-full>li.px-6').length > 0) {
          cy.findByRole('link', {name: new RegExp(site, 'i')}).click();
        }
    });
}