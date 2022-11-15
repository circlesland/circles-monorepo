import { NumericInputType, View, ViewType } from "../../src";
import { NumericInput } from '../../src/components';

describe('Numeric Input', () => {
    const selector = '[data-testId="input-test-id"] input';

    it('should display a numeric input with an initial value', (done) => {
        const numericView: View & NumericInputType = {
            id: 'numeric-input',
            testId: 'input-test-id',
            trigger: 'test-trigger-name',
            type: ViewType.NUMERIC_INPUT,
            args: {
                initialvalue: 5,
                labelConfig: {
                    label: 'test label',
                    localizationKey: 'test-localization-key'
                },
                placeholderConfig: {
                    value: 'placeholder',
                    localizationKey: 'test-localization-key'
                }
            }
        };

        cy.mount(NumericInput, { props: { view: numericView }});

        
        cy.get(selector).then((jQueryInput) => {
            const numericInput = jQueryInput[0];

            numericInput.addEventListener('test-trigger-name', (e) => {
                const { view, eventDetails, value } = e.detail;

                expect(view.id).to.eq(numericView.id);
                expect(value).to.eq(10);
                done();
            })
        });

        // Verify initial value
        cy.get(selector).should('have.value', 5);

        // Update the input value to assert the fact that the event is being raised.
        cy.get(selector).clear().type(10).blur();
    });
});