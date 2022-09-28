/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/svelte';
import { ToggleType, View, ViewType  } from '../../types';
import BooleanEditor from './BooleanEditor.svelte';
import { BooleanEditorType } from './types';

describe('Boolean Editor', () => {
    const setup = (view: View & ToggleType) => {
        render(BooleanEditor, { view });
    }

    it('shoudl render a checkbox that can be checked', async () => {
        const testId = 'test-checkbox-id';
        const label = 'This is a checkbox';
        const view: View & ToggleType = {
            id: 'test-checkbox',
            type: ViewType.BOOLEAN,
            testId,
            args: {
                type: BooleanEditorType.Checkbox,
                labelConfig: {
                    label,
                    localizationKey: 'i-18n-localization-key'
                },
                checked: false
            }
        };

        setup(view);

        const checkbox = screen.getByTestId(testId) as HTMLInputElement;
        expect(checkbox.checked).toBeFalsy();

        await fireEvent.click(checkbox);
        expect(checkbox.checked).toBeTruthy();

        const checkboxLabel = screen.getByText(label);
        expect(checkboxLabel).toBeDefined();
    });
});