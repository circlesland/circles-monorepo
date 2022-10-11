import { ViewType } from '../../types';
import EnumInput from './EnumInput.svelte';

export default {
  component: EnumInput,
  title: 'UIComponents/EnumInput',
};

const Template = ({ ...args }) => ({
  Component: EnumInput,
  props: args,
});

export const Radio = Template.bind({});
Radio.args = {
  view: {
    type: ViewType.ENUM_INPUT,
    args: {
      labelConfig: {
        label: 'Gender',
        localizationKey: 'localization-key-label',
      },
      placeholderConfig: {
        value: 'Gender',
        localizationKey: 'localization-key-placeholder',
      },
      type: 'radio',
      items: [
        { value: 'val1', localizationKey: 'val1-key' },
        { value: 'val2', localizationKey: 'val2-key' },
        { value: 'val3', localizationKey: 'val3-key' },
      ],
    },
  },
};

export const Select = Template.bind({});
Select.args = {
  view: {
    type: ViewType.ENUM_INPUT,
    args: {
      labelConfig: {
        label: 'Gender',
        localizationKey: 'localization-key-label',
      },
      placeholderConfig: {
        value: 'Gender',
        localizationKey: 'localization-key-placeholder',
      },
      type: 'select',
      items: [
        { value: 'val1', localizationKey: 'val1-key' },
        { value: 'val2', localizationKey: 'val2-key' },
        { value: 'val3', localizationKey: 'val3-key' },
      ],
    },
  },
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  view: {
    type: ViewType.ENUM_INPUT,
    args: {
      labelConfig: {
        label: 'Gender',
        localizationKey: 'localization-key-label',
      },
      placeholderConfig: {
        value: 'Gender',
        localizationKey: 'localization-key-placeholder',
      },
      type: 'multiselect',
      items: [
        { value: 'val1', localizationKey: 'val1-key' },
        { value: 'val2', localizationKey: 'val2-key' },
        { value: 'val3', localizationKey: 'val3-key' },
      ],
    },
  },
};
