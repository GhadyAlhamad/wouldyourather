import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from 'src/environments/environment';
import { userReducer, UserState } from './reducers/user.reducer';
import { questionsReducer, QuestionState } from './reducers/question.reducer';
import {
  leaderboardReducer,
  LeaderboardState,
} from './reducers/leaderboard.reducer';

export interface State {
  userState: UserState;
  auth: AuthState | null;
  questionState: QuestionState;
  leaderboardState: LeaderboardState;
}

export type User = {
  id: string;
  name: string;
  avatarURL: string;
  answers: {};
  questions: string[];
};

export const reducers: ActionReducerMap<State, CustomAction> = {
  userState: userReducer,
  auth: authReducer,
  questionState: questionsReducer,
  leaderboardState: leaderboardReducer,
};

// console.log all actions
export function debug(
  reducer: ActionReducer<State, CustomAction>
): ActionReducer<State, CustomAction> {
  return function (state, action) {
    // uncomment for debug
    // console.log('state', state);
    // console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State, CustomAction>[] =
  !environment.production
    ? [debug, localStorageSyncReducer]
    : [localStorageSyncReducer];

const reducerKeys = ['userState', 'auth', 'questionState', 'leaderboardState'];

export function localStorageSyncReducer(
  reducer: ActionReducer<State, CustomAction>
): ActionReducer<State, CustomAction> {
  return localStorageSync({ keys: reducerKeys, rehydrate: true })(reducer);
}

export interface CustomAction extends Action {
  type: string;
  payload: any;
}
