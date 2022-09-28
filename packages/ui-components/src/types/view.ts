import type { CustomBooleanEditorTheme } from "..//components/BooleanEditor";
import type { BooleanEditorType } from "../components/BooleanEditor";
import type { ButtonTypes, CustomButtonTheme } from "../components/Button";
import type { ValidatorFn } from "./validator";

/**
 * An interface that defines currently supported view types
 */
export enum ViewType {
  HORIZONTAL_LAYOUT = 'HorizontalLayout',
  VERTICAL_LAYOUT = 'VerticalLayout',
  BUTTON = 'Button',
  BOOLEAN = 'Boolean',
  TEXT_INPUT = 'TextInput',
  NUMERIC_INPUT = 'NumericInput',
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
    children?: View[];
  } & (HorizontalLayoutType | ButtonType | VerticalLayout | TextInput | NumericInput | ToggleType );

export type HorizontalLayoutType = {
  type: ViewType.HORIZONTAL_LAYOUT;
  children?: View[];
};

export type VerticalLayout = {
  type: ViewType.VERTICAL_LAYOUT;
  children?: View[];
};

export type ToggleType = {
  type: ViewType.BOOLEAN;
  args?: {
    type: BooleanEditorType,
    checked?: boolean,
    labelConfig?: {
      label: string;
      localizationKey: string;
    }
    customTheme?: CustomBooleanEditorTheme
  }
}

export type ButtonType = {
    type: ViewType.BUTTON;
    args?: {
        labelConfig?: {
            label: string;
            localizationKey: string;
        },
        type: ButtonTypes,
        icon?: {
            source: string,
            solid: boolean;
        };
        customTheme?: CustomButtonTheme
    }
}

type TextInputType = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';

export type TextInput = {
  type: ViewType.TEXT_INPUT;
  args: {
    labelConfig?: {
      label: string;
      localizationKey: string;
    };
    placeholderConfig: {
      value: string;
      localizationKey: string;
    };
    type: TextInputType;
  };
};

export type NumericInput = {
  type: ViewType.NUMERIC_INPUT;
  args: {
    labelConfig: {
      label: string;
      localizationKey: string;
    };
    placeholderConfig: {
      value: string;
      localizationKey: string;
    };
  };
};