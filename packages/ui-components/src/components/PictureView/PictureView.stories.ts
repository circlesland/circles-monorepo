import { ViewType } from '../../types';
import PictureViewComponent from './PictureView.svelte';

export default {
  component: PictureViewComponent,
  title: 'UIComponents/PictureView',
};

const Template = ({ ...args }) => ({
  Component: PictureViewComponent,
  props: args,
});

export const PictureView = Template.bind({});
PictureView.args = {
  view: {
    type: ViewType.PICTURE_VIEW,
    args: {
      image: 'https://placekitten.com/g/200/200',
    },
  },
};
