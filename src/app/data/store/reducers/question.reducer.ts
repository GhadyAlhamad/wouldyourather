import { Questions } from '../../_DATA';
import { CustomAction } from '../store';
import { GET_QUESTIONS_SUCCESS } from '../types/types.constant';
import * as storage from '../storage';

export interface QuestionState {
  questions: Questions;
  answered: number;
  unAnswered: number;
}

export const initialState: QuestionState = storage.getItem('questionState');

export function questionsReducer(
  state: QuestionState = initialState,
  action: CustomAction
): QuestionState {
  switch (action.type) {
    case GET_QUESTIONS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
