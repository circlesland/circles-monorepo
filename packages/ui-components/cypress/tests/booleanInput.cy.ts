import { View, ToggleType, ViewType } from "../../src";
import { BooleanInput, BooleanInputType } from "../../src/components/BooleanInput";

describe('BooleanInput', () => {
    const selector = '[data-testId="editor-test-id"]';

    it('should display a boolean editor in form of a checkbox', (done) => {
        const toggleView: View & ToggleType = {
            id: 'boolean-editor',
            trigger: 'test-trigger-name',
            type: ViewType.BOOLEAN,
            testId: 'editor-test-id',
            args: {
                type: BooleanInputType.Checkbox,
                checked: false,
                labelConfig: {
                    label: 'Test Label',
                    localizationKey: 'test-localization-key'
                }
            }
        };

        cy.mount(BooleanInput, { props: { view: toggleView }});

        cy.get(selector).then((jQueryToggle) => {
            const checkboxElement = jQueryToggle[0];

            checkboxElement.addEventListener('test-trigger-name', (e) => {
                const { view, eventDetails, value } = e.detail;

                expect(eventDetails).to.not.be.undefined;
                expect(toggleView.id).to.eq(view.id);
                expect(value).to.be.true;
                done();
            });
        });

        cy.get(selector).click();
    });

    it('should display a boolean editor in form of a toggle button', (done) => {
        const toggleView: View & ToggleType = {
            id: 'boolean-editor',
            trigger: 'test-trigger-name',
            type: ViewType.BOOLEAN,
            testId: 'editor-test-id',
            args: {
                type: BooleanInputType.Toggle,
                checked: false,
                labelConfig: {
                    label: 'Test Label',
                    localizationKey: 'test-localization-key'
                }
            }
        };

        cy.mount(BooleanInput, { props: { view: toggleView }});

        cy.get(selector).then((jQueryToggle) => {
            const toggleElement = jQueryToggle[0];

            toggleElement.addEventListener('test-trigger-name', (e) => {
                const { view, eventDetails, value } = e.detail;

                expect(eventDetails).to.not.be.undefined;
                expect(toggleView.id).to.eq(view.id);
                expect(value).to.be.true;
                done();
            });

            // Click using DOM API since toggle input cannot be clicked using cypress API
            toggleElement.click();
        });
    });
});