/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte';

import { ViewType } from '../../types';
import PictureInputSvelte from './PictureInput.svelte';

import type { View, PictureInput } from '../../types';
describe('Picture Input', () => {
  const pictureInput: View & PictureInput = {
    id: 'picture-input',
    testId: 'picture-input-test-id',
    type: ViewType.PICTURE_INPUT,
    args: {},
  };

  it('renders correctly', () => {
    const tree = render(PictureInputSvelte, { view: pictureInput });
    expect(tree).toMatchSnapshot();
  });
});
