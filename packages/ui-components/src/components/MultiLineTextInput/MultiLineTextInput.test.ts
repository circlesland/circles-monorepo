/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/svelte';

import { ViewType } from '../../types';
import MultiLineTextInputComponent from './MultiLineTextInput.svelte';

import type { View, MultiLineTextInput } from '../../types';

const textInput: View & MultiLineTextInput = {
  id: 'multi-line-text-input',
  testId: 'multi-line-text-input-test-id',
  type: ViewType.MULTI_LINE_TEXT_INPUT,
  args: {
    labelConfig: {
      label: 'Description',
      localizationKey: 'first-name-key',
    },
    placeholderConfig: {
      value: 'Description',
      localizationKey: 'first-name-key-2',
    },
    rows: 12,
  },
};

describe('MultiLineTextInput', () => {
  const setup = (view: View & MultiLineTextInput) => {
    render(MultiLineTextInputComponent, { view });
  };

  it('should render the multi-line text input', () => {
    setup(textInput);

    const layoutContainer = screen.queryByTestId(
      'multi-line-text-input-test-id'
    );
    expect(layoutContainer).not.toBeNull();
  });

  it('should set the correct rows property', () => {
    setup(textInput);
    const layoutContainer = screen.queryByTestId(
      'multi-line-text-input-test-id'
    );
    const inputType = layoutContainer
      .getElementsByTagName('textarea')
      .item(0)
      .getAttribute('rows');

    expect(inputType).toBe('12');
  });
});
