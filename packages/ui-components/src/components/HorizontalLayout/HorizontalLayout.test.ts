import { render, screen } from '@testing-library/svelte';
import type { View } from '../../types';
import { ViewType } from '../../types';
import HorizontalLayout from './HorizontalLayout.svelte';

describe('HorizontalLayout', () => {
  const setup = (view: View | HorizontalLayout) => {
      render(HorizontalLayout, { view })
  }

  it('should not render container if no view is available', () => {
    const emptyView: View = {
        id: 'layout',
        testId: 'layout-test-id',
        type: ViewType.HORIZONTAL_LAYOUT
    }
    setup(emptyView);

    const layoutContainer = screen.queryByTestId('layout-test-id');

    expect(layoutContainer).toBeNull();
  });

  it('should render container if at least 1 child is defined', () => {
    const view: View = {
      id: 'layout',
      testId: 'layout-test-id',
      type: ViewType.HORIZONTAL_LAYOUT,
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
        }
      ]
    };
    setup(view);

    const layoutContainer = screen.getByTestId('layout-test-id');
    expect(layoutContainer).toBeDefined();

    const button = screen.getByTestId('button-test-id');
    expect(button).toBeDefined();
  });
});