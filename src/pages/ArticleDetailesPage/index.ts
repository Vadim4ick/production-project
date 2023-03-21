export { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
export { ArticleDetailesPageAsync as ArticleDetailesPage } from './ui/ArticleDetailesPage/ArticleDetailesPage.async';

export {
  articleDetailsCommentsReducer,
  getArticleComments,
} from './model/slices/articleDetailsCommentsSlice';
