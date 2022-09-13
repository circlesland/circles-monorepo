import { ViewType } from '../../types';
import NumericInput from './NumericInput.svelte';

export default {
  component: NumericInput,
  title: 'UIComponents/NumericInput',
};

const Template = ({ ...args }) => ({
  Component: NumericInput,
  props: args,
});

export const SimpleNumericInput = Template.bind({});
SimpleNumericInput.args = {
  view: {
    type: ViewType.NUMERIC_INPUT,
    args: {
      labelConfig: {
        label: 'Age',
        localizationKey: 'localization-key-label',
      },
      placeholderConfig: {
        value: 'Age',
        localizationKey: 'localization-key-placeholder',
      },
    },
  },
};
