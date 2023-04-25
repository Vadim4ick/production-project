import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

import { fetchCommentsByArticleId } from './../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) =>
    state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    // ids: ['1', '2'],
    ids: [],
    error: undefined,
    entities: {},
  }),
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      commentsAdapter.setOne(state, action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByArticleId.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(
      fetchCommentsByArticleId.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.isLoading = false;
        commentsAdapter.setAll(state, action.payload);
      },
    );
    builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: articleDetailsCommentsActions } =
  articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;
