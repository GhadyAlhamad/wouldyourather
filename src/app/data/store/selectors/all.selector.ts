import { createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import { LeaderboardState } from '../reducers/leaderboard.reducer';
import { QuestionState } from '../reducers/question.reducer';
import { UserState } from '../reducers/user.reducer';

export let userStateFS = createFeatureSelector<UserState>('userState');
export let authFS = createFeatureSelector<AuthState>('auth');
export let questionStateFS =
  createFeatureSelector<QuestionState>('questionState');
export let leaderboardStateFS =
  createFeatureSelector<LeaderboardState>('leaderboardState');
