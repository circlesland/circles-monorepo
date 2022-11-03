/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/svelte';

import { ViewType } from '../../types';
import PictureViewComponent from './PictureView.svelte';

import type { View, PictureView } from '../../types';

const pictureView: View & PictureView = {
  id: 'picture-view',
  testId: 'picture-view-test-id',
  type: ViewType.PICTURE_VIEW,
  args: {
    image: 'https://placekitten.com/g/200/200',
  },
};

describe('PictureView', () => {
  const setup = (view: View & PictureView) => {
    render(PictureViewComponent, { view });
  };

  it('should render the picture view', () => {
    setup(pictureView);

    const pictureViewElement = screen.queryByTestId('picture-view-test-id');
    expect(pictureViewElement).not.toBeNull();
  });
});
