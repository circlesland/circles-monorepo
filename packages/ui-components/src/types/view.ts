import type { IconSource } from "svelte-hero-icons";
import type { ButtonTypes, CustomButtonTheme } from "../components/Button";
import type { ValidatorFn } from "./validator";

/**
 * An interface that defines currently supported view types
 */
 export enum ViewType {
    HORIZONTAL_LAYOUT = 'HorizontalLayout',
    VERTICAL_LAYOUT = 'VerticalLayout',
    BUTTON = 'Button'
}

/**
 * Basic view definition for a UI Component. All UI Components should derive from this interface
 */
export type View = {
    id: string;
    testId: string;
    type: ViewType;
    args?: { [key: string]: any };
    validators?: ValidatorFn[];
    children?: (View & (HorizontalLayoutType | ButtonType))[];
} & (HorizontalLayoutType | ButtonType);

export type HorizontalLayoutType = {
    type: ViewType.HORIZONTAL_LAYOUT;
}

export type ButtonType = {
    type: ViewType.BUTTON;
    args?: {
        labelConfig: {
            label: string;
            localizationKey: string;
        },
        type: ButtonTypes,
        icon?: {
            source: IconSource,
            solid: boolean;
        };
        customTheme?: CustomButtonTheme
    }
}