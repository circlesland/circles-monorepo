import { Button, ButtonType, ButtonTypes, View, ViewType } from '../../src';

describe('Button', () => {
  const buttonSelector = '[data-testId="button-test-id"]';
  let initial = 0;
  const callback = function () {
    initial++;
  };
    it('should display a button with an icon', () => {

        const view: View & ButtonType = {
            id: 'button',
            callback: callback,
            type: ViewType.BUTTON,
            testId: 'button-test-id',
            args: {
              type: ButtonTypes.IconText,
              labelConfig: {
                label: 'Button',
                localizationKey: 'button-localization-key'
              },
              icon: {
                source: 'academic-cap',
                solid: true
              }
            },
          };

        cy.mount(Button, { props: { view }});

        cy.get(buttonSelector).click();
        cy.wait(2000).then(() => {
          expect(initial).equal(1);
        });
    });
});