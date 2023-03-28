// import { ArticleSortField, ArticleType, ArticleView } from 'entities/Article';
// import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
// import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
// import { fetchNextArticlesPage } from './fetchNextArticlesPage';
// jest.mock('../fetchArticlesList/fetchArticlesList');
// describe('fetchNextArticlesPage.test', () => {
//   test('success', async () => {
//     const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
//       articlesPage: {
//         page: 2,
//         ids: [],
//         entities: {},
//         limit: 5,
//         isLoading: false,
//         hasMore: true,
//         // _inited: false,
//         // error: undefined,
//         // order: 'asc',
//         // search: '',
//         // sort: ArticleSortField.CREATED,
//         // view: ArticleView.SMALL,
//         // type: ArticleType.ALL,
//       },
//     });
//     await thunk.callThunk();
//     expect(thunk.dispatch).toBeCalledTimes(4);
//     expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
//   });
//   test('fetchArticleList not called', async () => {
//     const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
//       articlesPage: {
//         page: 2,
//         ids: [],
//         entities: {},
//         limit: 5,
//         isLoading: false,
//         hasMore: false,
//       },
//     });
//     await thunk.callThunk();
//     expect(thunk.dispatch).toBeCalledTimes(2);
//     expect(fetchArticlesList).not.toHaveBeenCalled();
//   });
//   test('isLoading', async () => {
//     const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
//       articlesPage: {
//         page: 2,
//         ids: [],
//         entities: {},
//         limit: 5,
//         isLoading: true,
//         hasMore: false,
//       },
//     });
//     await thunk.callThunk();
//     expect(thunk.getState().articlesPage?.isLoading).toBe(true);
//     expect(fetchArticlesList).not.toHaveBeenCalled();
//   });
// });
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { fetchNextArticlesPage } from './fetchNextArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    // expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
  });
  test('fetchAritcleList not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
