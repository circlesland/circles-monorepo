import { render } from "@testing-library/svelte";
import type { ButtonType, View } from "../../types";
import Button from './Button.svelte';

describe('Button', () => {
    const setup = (view: View & ButtonType) => {
        render(Button, { view })
    }
});