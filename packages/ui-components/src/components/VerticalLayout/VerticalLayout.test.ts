import { render, screen } from '@testing-library/svelte';

import { ViewType } from '../../types';
import VerticalLayout from './VerticalLayout.svelte';

import type { View } from '../../types';
describe('VerticalLayout', () => {
  const setup = (view: View | VerticalLayout) => {
    render(VerticalLayout, { view });
  };

  it('should not render container if no view is available', () => {
    const emptyView: View = {
      id: 'layout',
      testId: 'layout-test-id',
      type: ViewType.VERTICAL_LAYOUT,
    };
    setup(emptyView);

    const layoutContainer = screen.queryByTestId('layout-test-id');

    expect(layoutContainer).toBeNull();
  });

  it('should render container if at least 1 child is defined', () => {
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
    expect(button).toBeDefined();
  });
});
