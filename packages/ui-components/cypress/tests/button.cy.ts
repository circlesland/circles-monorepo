import { Button, ButtonType, ButtonTypes, View, ViewType } from '../../src';

describe('Button', () => {
  const buttonSelector = '[data-testId="button-test-id"]';
  it('should display a button with an icon', (done) => {
    const buttonView: View & ButtonType = {
      id: 'button',
      trigger: 'test-trigger-name',
      type: ViewType.BUTTON,
      testId: 'button-test-id',
      args: {
        type: ButtonTypes.IconText,
        labelConfig: {
          label: 'Button',
          localizationKey: 'button-localization-key',
        },
        icon: {
          source: 'academic-cap',
          solid: true,
        },
      },
    };

    cy.mount(Button, { props: { view: buttonView } });
    
    cy.get(buttonSelector).then((jQueryButton) => {
      const buttonElement = jQueryButton[0];
      buttonElement.addEventListener('test-trigger-name', (e) => {
        const { view, eventDetails } = e.detail;

        expect(eventDetails).to.not.be.undefined;
        expect(buttonView.id).to.eq(view.id);
        done();
      });
    });

    cy.get(buttonSelector).click();
  });

  it('should display a button with text', (done) => {
    const buttonView: View & ButtonType = {
      id: 'button',
      trigger: 'test-trigger-name',
      type: ViewType.BUTTON,
      testId: 'button-test-id',
      args: {
        type: ButtonTypes.Default,
        labelConfig: {
          label: 'Button',
          localizationKey: 'button-localization-key',
        }
      },
    };

    cy.mount(Button, { props: { view: buttonView } });
    
    cy.get(buttonSelector).then((jQueryButton) => {
      const buttonElement = jQueryButton[0];
      buttonElement.addEventListener('test-trigger-name', (e) => {
        const { view, eventDetails } = e.detail;

        expect(eventDetails).to.not.be.undefined;
        expect(buttonView.id).to.eq(view.id);
        done();
      });
    });

    cy.get(buttonSelector).click();
  });

  it('should display a circular icon button', (done) => {
    const buttonView: View & ButtonType = {
      id: 'button',
      trigger: 'test-trigger-name',
      type: ViewType.BUTTON,
      testId: 'button-test-id',
      args: {
        type: ButtonTypes.CircularWithIcon,
        icon: {
          source: 'academic-cap',
          solid: true,
        },
      },
    };

    cy.mount(Button, { props: { view: buttonView } });
    
    cy.get(buttonSelector).then((jQueryButton) => {
      const buttonElement = jQueryButton[0];
      buttonElement.addEventListener('test-trigger-name', (e) => {
        const { view, eventDetails } = e.detail;

        expect(eventDetails).to.not.be.undefined;
        expect(buttonView.id).to.eq(view.id);
        done();
      });
    });

    cy.get(buttonSelector).click();
  });
});
