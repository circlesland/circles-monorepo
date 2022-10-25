import { ViewType } from '../../types';
import PictureInput from './PictureInput.svelte';

export default {
  component: PictureInput,
  title: 'UIComponents/PictureInput',
};

const Template = ({ ...args }) => ({
  Component: PictureInput,
  props: args,
});

export const Square = Template.bind({});
Square.args = {
  view: {
    type: ViewType.PICTURE_INPUT,
    args: {},
  },
};
