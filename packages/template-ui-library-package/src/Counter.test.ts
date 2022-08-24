import Counter from './Counter.svelte';
import { fireEvent, render, screen } from '@testing-library/svelte';

describe('Counter', () => {
    const setup = (labelText?: string) => {
        if (labelText) {
            render(Counter, { label: labelText });
            return;
        }
        render(Counter);
    }

    it('should contain a button with a label and a count-value label', () => {
        setup();
        const label = screen.getByTestId('counter-value');
        const button = screen.getByTestId('increment-button');

        expect(label.textContent).toEqual(`Count is: 0`);
        expect(button.textContent).toEqual(`I'm a counter from the package library. Click me to increment`);
    });

    it('should display custom button label if set', () => {
        const labelText = 'my-custom-label';
        setup(labelText);

        const button = screen.getByTestId('increment-button');

        expect(button.textContent).toEqual(labelText);
    })

    it('should increment counter value on click', async () => {
        setup();
        const incrementButton = screen.getByTestId('increment-button');
        const label = screen.getByTestId('counter-value');
        
        await fireEvent.click(incrementButton); // Fire specific click event
        expect(label.textContent).toEqual('Count is: 1');

        await fireEvent(incrementButton, new Event('click')); // Or fire event by name (good for custom events)
        expect(label.textContent).toEqual('Count is: 2');
    });
});