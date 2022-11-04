import type { ICondition } from '../';

export const searchCondition: ICondition<any, any> = (context, event) => {
  return context.canSearch && event.query && event.query.length > 0;
};
