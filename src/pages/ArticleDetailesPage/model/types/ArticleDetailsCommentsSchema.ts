import { EntityState } from '@reduxjs/toolkit';

import { Comment } from 'entities/Comment';

export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
  isLoading?: boolean;
  error?: string;
  // data?: Comment[];
  // ids: string[];
  // entities: Record<>
}