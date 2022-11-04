import type { Condition as _Condition, EventObject } from 'xstate';

export type ICondition<TContext, TEvent extends EventObject> = _Condition<
  TContext,
  TEvent
>;
