import { Button, ButtonType, ButtonTypes, View, ViewType } from '../../src';
import { waitForAsync } from '../support/commands';


describe('Button', () => {
  const buttonSelector = '[data-testId="button-test-id"]';
  it('should display a button with an icon', async () => {
    let clickCount = 0;
    const clickCallback = () => {
      clickCount++;
    };
    const view: View & ButtonType = {
      id: 'button',
      callback: clickCallback,
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

    cy.mount(Button, { props: { view } });
    cy.get(buttonSelector).click();

    await waitForAsync(() => clickCount === 1);
    expect(clickCount).to.eq(1);
  });

  it('should display a circular icon button', async () => {
    let clickCount = 0;
    const clickCallback = () => {
      clickCount++;
    };

    const view: View & ButtonType = {
      id: 'button',
      callback: clickCallback,
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

    cy.mount(Button, { props: { view } });
    cy.get(buttonSelector).click();

    await waitForAsync(() => clickCount === 1);
    expect(clickCount).to.eq(1);
  });
});
