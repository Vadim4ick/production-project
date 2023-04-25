import { createAsyncThunk } from '@reduxjs/toolkit';

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { ThunkConfig } from '@/app/providers/StoreProvider';

interface IActionMap<T> {
  [key: string]: (payload: T) => any;
}
interface IArticlePageActionsMap {
  order: typeof articlesPageActions.setOrder;
  sort: typeof articlesPageActions.setSort;
  search: typeof articlesPageActions.setSearch;
}
export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const inited = getArticlesPageInited(getState());
  if (!inited) {
    // 1 способ
    // const orderFromUrl = searchParams.get('order') as SortOrder;
    // const sortFromUrl = searchParams.get('sort') as ArticleSortField;
    // const searchFromUrl = searchParams.get('search');
    // if (orderFromUrl) {
    //   dispatch(articlesPageActions.setOrder(orderFromUrl));
    // }
    // if (sortFromUrl) {
    //   dispatch(articlesPageActions.setSort(sortFromUrl));
    // }
    // if (searchFromUrl) {
    //   dispatch(articlesPageActions.setSearch(searchFromUrl));
    // }
    // 2-й способ
    const params = Array.from(searchParams.entries());
    const articlePageActionsMap: IActionMap<any> & IArticlePageActionsMap = {
      order: articlesPageActions.setOrder,
      sort: articlesPageActions.setSort,
      search: articlesPageActions.setSearch,
      type: articlesPageActions.setType,
    };
    for (const [key, value] of params) {
      const action = articlePageActionsMap[key];
      if (action) {
        dispatch(action(value));
      }
    }
    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
