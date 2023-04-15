export type { ArticleDetailsPageRecommendationsSchema } from './model/types/ArticleDetailsPageRecommendationsSchema';
export type { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
export { ArticleDetailesPageAsync as ArticleDetailesPage } from './ui/ArticleDetailesPage/ArticleDetailesPage.async';
export {
  articleDetailsCommentsReducer,
  getArticleComments,
} from './model/slices/articleDetailsCommentsSlice';
export type { ArticleDetailsPageSchema } from './model/types';
