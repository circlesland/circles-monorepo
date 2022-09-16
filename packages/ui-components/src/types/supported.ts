import Button from '../components/Button/Button.svelte';
import { ViewType } from "./view";

/**
 * A list of currently supported components that can be rendered based on configuration
 */
export const SupportedViews = {
    [ViewType.BUTTON]: Button
};