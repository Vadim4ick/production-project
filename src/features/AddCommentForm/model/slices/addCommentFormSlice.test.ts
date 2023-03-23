import { PayloadAction } from '@reduxjs/toolkit';

import { AddCommentFormSchema } from '../types/addCommentForm';

import {
  addCommentFormActions,
  addCommentFormReducer,
} from './addCommentFormSlice';

describe('addCommentFormSlice', () => {
  let initialState: AddCommentFormSchema;

  beforeEach(() => {
    initialState = {
      text: '',
    };
  });

  it('should return the initial state on first run', () => {
    const nextState = addCommentFormReducer(undefined, {} as PayloadAction);

    expect(nextState).toEqual(initialState);
  });

  it('should update the text field when setText action is dispatched', () => {
    const actionPayload = 'test comment';
    const nextState = addCommentFormReducer(
      initialState,
      addCommentFormActions.setText(actionPayload),
    );

    expect(nextState).toEqual({ ...initialState, text: actionPayload });
  });
});
