import { ViewType } from '../../types';
import Button from './Button.svelte';
import { ButtonTypes } from './types';

export default {
  component: Button,
  title: 'UIComponents/Button',
};

const Template = ({ ...args }) => ({
  Component: Button,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  view: {
    id: 'button',
    type: ViewType.BUTTON,
    testId: 'button-test-id',
    args: {
      labelConfig: {
        label: 'Button',
        localizationKey: 'btn-localization-key',
      }
    },
  },
};

export const CircularWithIcon = Template.bind({});
CircularWithIcon.args = {
  view: {
    id: 'button',
    type: ViewType.BUTTON,
    testId: 'button-test-id',
    args: {
      type: ButtonTypes.CircularWithIcon,
      icon: {
        source: 'academic-cap',
        solid: true
      }
    }
  }
};

export const IconText = Template.bind({});
IconText.args = {
  view: {
    id: 'button',
    testId: 'button-test-id',
    type: ViewType.BUTTON,
    args: {
      labelConfig: {
        label: 'Button with icon',
        localizationKey: 'btn-localization-key'
      },
      type: ButtonTypes.IconText,
      icon: {
        source: 'academic-cap',
        solid: true
      }
    }
  }
};