import type { NavigationInfo } from './navigation-info';
import type { ViewType } from '@circlesland/ui-components';

export interface PromptEventPayload {
  id: string;
  title: string;
  navigationInfo: NavigationInfo;
  params: { [key: string]: any };
  viewType: ViewType;
}
