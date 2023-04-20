import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleDetailsData } from '@/entities/Article/model/selectors/ArticleDetails';
import { Comment } from '@/entities/Comment';
import { getAuthUserData } from '@/entities/User';

import { articleDetailsCommentsActions } from '../../slices/articleDetailsCommentsSlice';

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
  const { dispatch, extra, rejectWithValue, getState } = thunkApi;

  const userData = getAuthUserData(getState());
  const article = getArticleDetailsData(getState());

  if (!userData || !text || !article) {
    return rejectWithValue('no data');
  }

  try {
    const response = await extra.api.post<Comment>('/comments', {
      articleId: article.id,
      userId: userData.id,
      text: text,
    });

    if (!response.data) {
      throw new Error();
    }

    const newComment: Comment = {
      id: response.data.id,
      user: userData,
      text: text,
    };

    dispatch(articleDetailsCommentsActions.addComment(newComment));

    return response.data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
