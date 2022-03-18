import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetLeaderboardAction } from 'src/app/data/store/actions/leaderboard.action';
import { UserScore } from 'src/app/data/store/reducers/leaderboard.reducer';
import { leaderboardStateFS } from 'src/app/data/store/selectors/all.selector';
import { State } from 'src/app/data/store/store';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.less'],
})
export class LeaderboardComponent implements OnInit {
  // properties
  usersScores: UserScore[] = [];
  leaderboardSubscribe: any;

  constructor(private store: Store<State>) {
    // subscribe to authentication store
    this.leaderboardSubscribe = this.store
      .select(leaderboardStateFS)
      .subscribe((leaderboardState: any) => {
        if (leaderboardState != null) {
          this.usersScores = leaderboardState.usersScores;
        }
      });
  }

  ngOnInit(): void {
    // dispatch get users action
    this.store.dispatch(new GetLeaderboardAction());
  }

  // destroy
  ngOnDestroy(): void {
    // unsubscribe state
    this.leaderboardSubscribe.unsubscribe();
  }

  getUserAvatarURL(avatarURL: any): string {
    if (avatarURL != null && avatarURL != undefined) {
      return avatarURL.indexOf('data:image') != -1
        ? avatarURL
        : `../../../assets/photos/${avatarURL}`;
    } else return '';
  }
}
