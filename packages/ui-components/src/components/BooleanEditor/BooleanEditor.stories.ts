import { ViewType } from "../../types";
import BooleanEditor from "./BooleanEditor.svelte";
import { BooleanEditorType } from "./types/booleanEditorType";

export default {
    component: BooleanEditor,
    title: 'UIComponents/BooleanEditor'
};

const Template = ({ ...args }) => ({
    Component: BooleanEditor,
    props: args
});

export const Checkbox = Template.bind({});
Checkbox.args = {
    view: {
        id: 'a-checkbox',
        type: ViewType.BOOLEAN,
        args: {
            type: BooleanEditorType.Checkbox,
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
            type: BooleanEditorType.Toggle,
            checked: true,
            labelConfig: {
                label: `I'm a toggle`,
                localizationKey: 'toggle-localization-key'
            }
        }
    }
}