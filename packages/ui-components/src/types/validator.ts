import type { ConditionType } from '@circlesland/xstate-validators';

type ValidatorOptions = {
  id: ConditionType;
  args: any[];
};

/**
 * We'll provide a reference to one or more validator function(s)
 */
export type Validator = ValidatorOptions | ValidatorOptions[];
