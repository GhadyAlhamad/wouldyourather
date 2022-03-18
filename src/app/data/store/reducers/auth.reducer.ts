import { CustomAction, User } from '../store';
import * as storage from '../storage';
import {
  AUTHENTICATE_SUCCESS,
  LOGOUT_SUCCESS,
  REFRESH_AUTHENTICATE_SUCCESS,
  SAVE_USER_SUCCESS,
} from '../types/types.constant';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = storage.getItem('auth');

export function authReducer(
  state: AuthState | null = initialState,
  action: CustomAction
): AuthState | null {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return action.payload;
    case REFRESH_AUTHENTICATE_SUCCESS:
      return action.payload;
    case SAVE_USER_SUCCESS:
      return action.payload;
    case LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
}
