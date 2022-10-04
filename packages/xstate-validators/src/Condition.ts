import { searchCondition } from './conditions/searchCondition';

export enum ConditionType {
  SEARCH_CONDITION = 'SearchCondition',
}

/**
 * A list of supported conditions that can be applied in an X-State flow
 */
export const supportedConditions = {
  [ConditionType.SEARCH_CONDITION]: searchCondition,
};
