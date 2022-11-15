/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/svelte';

import { ViewType } from '../../types';
import NumericInputComponent from './NumericInput.svelte';

import type { View, NumericInputType } from '../../types';

const numericInput: View & NumericInputType = {
  id: 'numeric-input',
  testId: 'numeric-input-test-id',
  type: ViewType.NUMERIC_INPUT,
  args: {
    labelConfig: {
      label: 'Age',
      localizationKey: 'age-key',
    },
    placeholderConfig: {
      value: 'Age',
      localizationKey: 'age-key-2',
    },
  },
};

describe('NumericInput', () => {
  const setup = (view: View & NumericInputType) => {
    render(NumericInputComponent, { view });
  };

  it('should render the numeric input', () => {
    setup(numericInput);

    const layoutContainer = screen.queryByTestId('numeric-input-test-id');
    expect(layoutContainer).not.toBeNull();
  });
});
