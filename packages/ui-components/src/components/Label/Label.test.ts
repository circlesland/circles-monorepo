/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/svelte';

import { ViewType } from '../../types';
import LabelComponent from './Label.svelte';

import type { View, LabelType } from '../../types';

const label: View & LabelType = {
  id: 'label',
  testId: 'label-test-id',
  type: ViewType.LABEL,
  args: {
    text: 'Random text test',
  },
};

describe('Label', () => {
  const setup = (view: View & LabelType) => {
    render(LabelComponent, { view });
  };

  it('should render the label', () => {
    setup(label);

    const textLabelElement = screen.queryByTestId('label-test-id');
    expect(textLabelElement.textContent).toBe('Random text test');
  });
});
