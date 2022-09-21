/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/svelte';

import { ViewType } from '../../types';
import TextInputComponent from './TextInput.svelte';

import type { View, TextInput } from '../../types';

const textInput: View & TextInput = {
  id: 'text-input',
  testId: 'text-input-test-id',
  type: ViewType.TEXT_INPUT,
  args: {
    labelConfig: {
      label: 'First name',
      localizationKey: 'first-name-key',
    },
    placeholderConfig: {
      value: 'First name',
      localizationKey: 'first-name-key-2',
    },
    type: 'text',
  },
};

describe('TextInput', () => {
  const setup = (view: View & TextInput) => {
    render(TextInputComponent, { view });
  };

  it('should render the text input', () => {
    setup(textInput);

    const layoutContainer = screen.queryByTestId('text-input-test-id');
    expect(layoutContainer).not.toBeNull();
  });

  it('should set the correct input type', () => {
    setup(textInput);
    const layoutContainer = screen.queryByTestId('text-input-test-id');
    const inputType = layoutContainer
      .getElementsByTagName('input')
      .item(0)
      .getAttribute('type');

    expect(inputType).toBe('text');
  });
});
