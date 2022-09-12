import { render, screen } from '@testing-library/svelte';
import type { View, HorizontalLayout } from '../../types';
import { ViewType } from '../../types';
import HorizontalLayoutComponent from './HorizontalLayout.svelte';

describe('HorizontalLayout', () => {
  const setup = (view: View & HorizontalLayout) => {
      render(HorizontalLayoutComponent, { view })
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
});