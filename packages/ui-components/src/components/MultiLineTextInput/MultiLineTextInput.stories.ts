import { ViewType } from '../../types';
import MultiLineTextInput from './MultiLineTextInput.svelte';

export default {
  component: MultiLineTextInput,
  title: 'UIComponents/MultiLineTextInput',
};

const Template = ({ ...args }) => ({
  Component: MultiLineTextInput,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  view: {
    type: ViewType.MULTI_LINE_TEXT_INPUT,
    args: {
      labelConfig: {
        label: 'Description',
        localizationKey: 'localization-key-label',
      },
      placeholderConfig: {
        value: 'Description',
        localizationKey: 'localization-key-placeholder',
      },
      rows: 20,
    },
  },
};
