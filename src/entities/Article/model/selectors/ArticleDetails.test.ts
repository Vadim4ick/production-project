import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from './ArticleDetails';

describe('ArticleDetails', () => {
  test('should return data', () => {
    const data = {
      id: '1',
      title: 'test',
    };

    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: data,
      },
    };

    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  test('should work with empty state data', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
  });

  test('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    };

    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: 'error',
      },
    };

    expect(getArticleDetailsError(state as StateSchema)).toEqual('error');
  });

  test('should work with empty state  isLoading', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
  });
});
