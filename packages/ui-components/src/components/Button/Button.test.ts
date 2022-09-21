/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/svelte';
import { ButtonType, View, ViewType } from '../../types';
import Button from './Button.svelte';
import { ButtonTypes } from './types';

describe('Button', () => {
  const setup = (view: View & ButtonType) => {
    render(Button, { view });
  };

  it('should render a button with text', () => {
    const view: View & ButtonType = {
      id: 'button',
      type: ViewType.BUTTON,
      testId: 'button-test-id',
      args: {
        labelConfig: {
          label: 'Button',
          localizationKey: 'btn-localization-key',
        },
        type: ButtonTypes.Default,
      },
    };

    setup(view);

    const button = screen.getByTestId('button-test-id');
    expect(button).toBeDefined();
    expect(button.textContent).toEqual(view.args.labelConfig.label);
  });

  it('should render a button with an icon', () => {
    const view: View & ButtonType = {
      id: 'button',
      type: ViewType.BUTTON,
      testId: 'button-test-id',
      args: {
        type: ButtonTypes.CircularWithIcon,
        icon: {
          source: 'academic-cap',
          solid: true
        }
      },
    };

    setup(view);

    const button = screen.getByTestId('button-test-id');
    expect(button).toBeDefined();
    const icon = screen.getAllByTestId('button-test-id-icon');
    expect(icon).toBeDefined();
  });

  it('should render a button with an icon and text', () => {
    const view: View & ButtonType = {
      id: 'button',
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

    setup(view);

    const button = screen.getByTestId('button-test-id');
    expect(button).toBeDefined();
    expect(button.textContent).toEqual(' Button');
    const icon = screen.getAllByTestId('button-test-id-icon');
    expect(icon).toBeDefined();
  });
});
