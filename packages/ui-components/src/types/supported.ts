import Button from '../components/Button/Button.svelte';
import Label from '../components/Label/Label.svelte';
import PictureView from '../components/PictureView/PictureView.svelte';
import { ViewType } from './view';

/**
 * A list of currently supported components that can be rendered based on configuration
 */
export const SupportedViews = {
  [ViewType.BUTTON]: Button,
  [ViewType.PICTURE_VIEW]: PictureView,
  [ViewType.LABEL]: Label,
};
