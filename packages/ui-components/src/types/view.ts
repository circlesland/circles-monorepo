import type { ValidatorFn } from './validator';

/**
 * An interface that defines currently supported view types
 */
export enum ViewType {
  HORIZONTAL_LAYOUT = 'HorizontalLayout',
  VERTICAL_LAYOUT = 'VerticalLayout',
  BUTTON = 'Button',
  TEXT_INPUT = 'TextInput',
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
} & (HorizontalLayout | Button | VerticalLayout | TextInput);

export type HorizontalLayout = {
  type: ViewType.HORIZONTAL_LAYOUT;
  children?: View[];
};

export type VerticalLayout = {
  type: ViewType.VERTICAL_LAYOUT;
  children?: View[];
};

export type Button = {
  type: ViewType.BUTTON;
  args?: {
    labelConfig: {
      label: string;
      localizationKey: string;
    };
  };
};

type TextInputType = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';

export type TextInput = {
  type: ViewType.TEXT_INPUT;
  args: {
    labelConfig: {
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
