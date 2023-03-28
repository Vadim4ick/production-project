import { combineReducers } from '@reduxjs/toolkit';

import { articleDetailsPageRecommendationsReducer } from 'pages/ArticleDetailesPage/model/slices/articleDetailsPageRecommendationsSlice';

import { ArticleDetailsPageSchema } from './../types/index';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
  });
