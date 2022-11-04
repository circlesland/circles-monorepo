import type { NavigationInfo } from './navigationInfo';
import type { ViewType } from '@circlesland/ui-components';

export interface PromptEventPayload {
  id: string;
  title: string;
  navigationInfo: NavigationInfo;
  params: { [key: string]: any };
  viewType: ViewType;
}
