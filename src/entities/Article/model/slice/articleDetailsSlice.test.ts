import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';

import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ArticleType } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

const data = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  type: [ArticleType.IT],
  blocks: [],
};

describe('articleDetails.test', () => {
  test('test articleDetails pending', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: false,
    };

    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.pending,
      ),
    ).toEqual({
      isLoading: true,
    });
  });

  test('test articleDetails fulfilled', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: true,
    };

    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.fulfilled(data, '', ''),
      ),
    ).toEqual({
      isLoading: false,
      error: undefined,
      data: data,
    });
  });

  test('test articleDetails rejected', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: true,
      error: undefined,
    };

    const actionPayload = 'error message';

    expect(
      articleDetailsReducer(state as ArticleDetailsSchema, {
        payload: actionPayload,
        type: fetchArticleById.rejected.type,
      }),
    ).toEqual({
      isLoading: false,
      data: undefined,
      error: actionPayload,
    });
  });
});
