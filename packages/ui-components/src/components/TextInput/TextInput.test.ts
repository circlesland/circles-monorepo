import { render, screen } from '@testing-library/svelte';

import { ViewType } from '../../types';
import TextInput from './TextInput.svelte';

import type { View } from '../../types';
describe('VerticalLayout', () => {
  const setup = (view: View | TextInput) => {
    render(TextInput, { view });
  };

  it('should not render input if no view is available', () => {
    const emptyView: View = {
      id: 'layout',
      testId: 'layout-test-id',
      type: ViewType.TEXT_INPUT,
      args: {
        labelConfig: {
          label: 'First Name',
          localizationKey: 'localization-key-label',
        },
        placeholderConfig: {
          value: 'First Name',
          localizationKey: 'localization-key-placeholder',
        },
        type: 'text',
        minLength: 10,
      },
    };
    setup(emptyView);

    const layoutContainer = screen.queryByTestId('layout-test-id');

    expect(layoutContainer).toBeNull();
  });

  it('should have min length set', () => {
    const view: View = {
      id: 'layout',
      testId: 'layout-test-id',
      type: ViewType.VERTICAL_LAYOUT,
      children: [
        {
          id: 'button',
          type: ViewType.BUTTON,
          testId: 'button-test-id',
          args: {
            labelConfig: {
              label: 'Button',
              localizationKey: 'btn-localization-key',
            },
          },
        },
      ],
    };
    setup(view);

    const layoutContainer = screen.getByTestId('layout-test-id');
    expect(layoutContainer).toBeDefined();

    const button = screen.getByTestId('button-test-id');
    expect(button.att);
    expect(button).toBeDefined();
  });
});
