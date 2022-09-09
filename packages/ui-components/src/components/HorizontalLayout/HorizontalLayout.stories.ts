import { ViewType } from '../../types';
import HorizontalLayout from './HorizontalLayout.svelte';

export default {
  component: HorizontalLayout,
  title: 'UIComponents/HorizontalLayout',
};

const Template = ({ ...args }) => ({
  Component: HorizontalLayout,
  props: args,
});

const button = {
  id: 'button',
  type: ViewType.BUTTON,
  testId: 'button-test-id',
  args: {
    labelConfig: {
      label: 'Button',
      localizationKey: 'btn-localization-key',
    },
  },
};

export const WithMultipleChildren = Template.bind({});
WithMultipleChildren.args = {
  view: {
    type: ViewType.HORIZONTAL_LAYOUT,
    children: [
      button,
      button,
      button,
      button,
    ],
  },
};
