import { ViewType } from '../../types';
import VerticalLayout from './VerticalLayout.svelte';

export default {
  component: VerticalLayout,
  title: 'UIComponents/VerticalLayout',
};

const Template = ({ ...args }) => ({
  Component: VerticalLayout,
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
    type: ViewType.VERTICAL_LAYOUT,
    children: [button, button, button, button],
  },
};
