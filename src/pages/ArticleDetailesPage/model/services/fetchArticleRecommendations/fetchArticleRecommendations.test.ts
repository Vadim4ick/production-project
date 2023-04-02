import { Article } from 'entities/Article';
import { ArticleType } from 'entities/Article';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchArticleRecommendations } from './fetchArticleRecommendations';

const data: DeepPartial<Article> = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  user: {
    id: '1',
    username: 'Vadim',
    avatar:
      'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
  },
  type: [ArticleType.IT],
  blocks: [],
};

const articleRecommendations = {
  error: '',
  isLoading: false,
  ids: [],
  entities: data,
};

describe('addCommentForArticle', () => {
  it('success get articleRecommendations', async () => {
    const thunk = new TestAsyncThunk(fetchArticleRecommendations);
    thunk.api.get.mockReturnValue(
      Promise.resolve({ data: articleRecommendations }),
    );

    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(articleRecommendations);
  });

  it('should throw error on empty API response', async () => {
    const thunk = new TestAsyncThunk(fetchArticleRecommendations);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk();

    expect(result.payload).toBe('error');
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
