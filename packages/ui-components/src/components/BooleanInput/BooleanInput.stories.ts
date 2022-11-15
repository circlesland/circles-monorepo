import { ViewType } from "../../types";
import BooleanInput from "./BooleanInput.svelte";
import { BooleanInputType } from "./types/booleanInputType";

export default {
    component: BooleanInput,
    title: 'UIComponents/BooleanInput'
};

const Template = ({ ...args }) => ({
    Component: BooleanInput,
    props: args
});

export const Checkbox = Template.bind({});
Checkbox.args = {
    view: {
        id: 'a-checkbox',
        type: ViewType.BOOLEAN,
        args: {
            type: BooleanInputType.Checkbox,
            checked: true,
            labelConfig: {
                label: `I'm a checkbox`,
                localizationKey: 'checkbox-localization-key'
            }
        }
    }
}

export const Toggle = Template.bind({});
Toggle.args = {
    view: {
        type: ViewType.BOOLEAN,
        args: {
            type: BooleanInputType.Toggle,
            checked: true,
            labelConfig: {
                label: `I'm a toggle`,
                localizationKey: 'toggle-localization-key'
            }
        }
    }
}