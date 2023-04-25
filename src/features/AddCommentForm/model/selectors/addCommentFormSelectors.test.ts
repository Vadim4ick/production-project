import {
  getAddCommentFormError,
  getAddCommentFormText,
} from './addCommentFormSelectors';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('ArticleDetails', () => {
  test('should return text', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: {
        text: 'test',
      },
    };

    expect(getAddCommentFormText(state as StateSchema)).toEqual('test');
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: {
        error: 'error',
      },
    };

    expect(getAddCommentFormError(state as StateSchema)).toEqual('error');
  });

  test('should return undefined', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: {},
    };

    expect(getAddCommentFormError(state as StateSchema)).toEqual(undefined);
  });
});
