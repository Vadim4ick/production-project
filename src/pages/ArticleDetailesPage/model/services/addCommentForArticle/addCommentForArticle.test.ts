import { StateSchema } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { addCommentForArticle } from './addCommentForArticle';

const comment: Comment = {
  id: '1',
  text: '1',
  user: { id: '1', username: 'vadim' },
};

const state: DeepPartial<StateSchema> = {
  articleDetails: {
    data: {
      id: '1',
    },
  },
  user: {
    authData: {
      id: '1',
    },
  },
};

describe('addCommentForArticle', () => {
  it('success add article', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, state);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }));

    const result = await thunk.callThunk('text');

    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(comment);
  });
  it('error no data', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }));

    const result = await thunk.callThunk('');

    expect(thunk.api.post).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
  it('error add comment', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk('text');

    expect(thunk.api.post).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
