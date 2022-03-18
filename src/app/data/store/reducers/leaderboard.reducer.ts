import { CustomAction } from '../store';
import { GET_LEADERBOARD_SUCCESS } from '../types/types.constant';
import * as storage from '../storage';

export interface LeaderboardState {
  usersScores: UserScore[];
}

export interface UserScore {
  username: string;
  avatarURL: string;
  answeredQuestion: number;
  createdQuestion: number;
}

export const initialState: LeaderboardState =
  storage.getItem('leaderboardState');

export function leaderboardReducer(
  state: LeaderboardState = initialState,
  action: CustomAction
): LeaderboardState {
  switch (action.type) {
    case GET_LEADERBOARD_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
