import { CustomAction } from '../store';
import * as storage from '../storage';
import { GET_USERS, SUCCESS_USERS } from '../types/types.constant';
import { Users } from '../../_DATA';

export interface UserState {
  users: Users | {};
}

export const initialState: UserState = storage.getItem('userState');

export function userReducer(
  state: UserState = initialState,
  action: CustomAction
): UserState {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case SUCCESS_USERS:
      return action.payload;
    default:
      return state;
  }
}
