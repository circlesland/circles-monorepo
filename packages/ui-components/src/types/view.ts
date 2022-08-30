import type { ValidatorFn } from "./validator";

/**
 * An interface that defines currently supported view types
 */
export enum ViewType {
    HORIZONTAL_LAYOUT,
    VERTICAL_LAYOUT
}

/**
 * Basic view definition for a UI Component. All UI Components should derive from this interface
 */
export interface View {
    id: string;
    testId: string;
    type: ViewType;
    args: { [key: string]: any };
    validators?: ValidatorFn[];
    children?: View[];
    valueChange?: (value: any) => void;
}