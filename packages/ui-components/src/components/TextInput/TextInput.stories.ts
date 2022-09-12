import { ViewType } from '../../types';
import TextInput from './TextInput.svelte';

export default {
  component: TextInput,
  title: 'UIComponents/TextInput',
};

const Template = ({ ...args }) => ({
  Component: TextInput,
  props: args,
});

export const WithTypeText = Template.bind({});
WithTypeText.args = {
  view: {
    type: ViewType.TEXT_INPUT,
    args: {
      labelConfig: {
        label: 'First Name',
        localizationKey: 'localization-key-label',
      },
      placeholderConfig: {
        value: 'First Name',
        localizationKey: 'localization-key-placeholder',
      },
      type: 'text',
      minLength: 10,
    },
  },
};

export const WithTypePassword = Template.bind({});
WithTypePassword.args = {
  view: {
    type: ViewType.TEXT_INPUT,
    args: {
      labelConfig: {
        label: 'Password',
        localizationKey: 'localization-key-label',
      },
      placeholderConfig: {
        value: 'Password',
        localizationKey: 'localization-key-placeholder',
      },
      type: 'password',
    },
  },
};
