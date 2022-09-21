/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/svelte';
import type { View, HorizontalLayoutType } from '../../types';
import { ViewType } from '../../types';
import { ButtonTypes } from '../Button';
import HorizontalLayoutComponent from './HorizontalLayout.svelte';

describe('HorizontalLayout', () => {
  const setup = (view: View & HorizontalLayoutType) => {
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

  it('should render container with a button', () => {
    const view: View = {
      id: 'layout',
      testId: 'layout-test-id',
      type: ViewType.HORIZONTAL_LAYOUT,
      children: [{
        id: 'button',
        type: ViewType.BUTTON,
        testId: 'button-test-id',
        args: {
          labelConfig: {
            label: 'Button',
            localizationKey: 'btn-localization-key',
          },
          type: ButtonTypes.Default
        },
      }]
    }
    setup(view);

    const button = screen.getByTestId('button-test-id');
    expect(button).toBeDefined();
    expect(button.textContent).toEqual('Button');
  });

  it('should render composed layout with button inside', () => {
    const view: View = {
      id: 'layout',
      testId: 'layout-test-id',
      type: ViewType.HORIZONTAL_LAYOUT,
      children: [{
        id: 'child-layout',
        testId: 'child-layout',
        type: ViewType.HORIZONTAL_LAYOUT,
        children: [{
          id: 'button',
          type: ViewType.BUTTON,
          testId: 'button-test-id',
          args: {
            icon: {
              source: 'academic-cap',
              solid: true
            },
            type: ButtonTypes.CircularWithIcon
          },
        }]
      }]
    }
    setup(view);

    const childLayout = screen.getByTestId('child-layout')
    expect(childLayout).toBeDefined();

    const button = screen.getByTestId('button-test-id');
    expect(button).toBeDefined();
  });
});