import { ViewType } from '../../types';
import LabelComponent from './Label.svelte';

export default {
  component: LabelComponent,
  title: 'UIComponents/Label',
};

const Template = ({ ...args }) => ({
  Component: LabelComponent,
  props: args,
});

export const Label = Template.bind({});
Label.args = {
  view: {
    type: ViewType.LABEL,
    args: {
      text: 'Random text from label component',
    },
  },
};
