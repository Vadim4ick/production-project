import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from './comments';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('comments', () => {
  test('test article comments isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: {
        comments: {
          isLoading: true,
        },
      },
    };

    expect(getArticleCommentsIsLoading(state as StateSchema)).toEqual(true);
  });
  test('test article comments Error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: {
        comments: {
          error: 'error',
        },
      },
    };

    expect(getArticleCommentsError(state as StateSchema)).toEqual('error');
  });
  test('test article comments Undefined', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: {
        comments: {},
      },
    };

    expect(getArticleCommentsError(state as StateSchema)).toEqual(undefined);
  });
});
