import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { catchError, from, map, mergeMap, of, tap } from 'rxjs';
import { MessageSnackbarComponent } from 'src/app/components/messagesnackbar/messagesnackbar.component';
import { _getUsers } from '../../_DATA';
import {
  GetLeaderboardAction,
  GetLeaderboardFailedAction,
  GetLeaderboardSuccessAction,
} from '../actions/leaderboard.action';
import {
  GET_LEADERBOARD,
  GET_LEADERBOARD_FAILED,
  GET_LEADERBOARD_SUCCESS,
} from '../types/types.constant';

@Injectable()
export class LeaderboardEffect {
  leaderboardEffect = createEffect(() =>
    this.actions.pipe(
      ofType(GET_LEADERBOARD),
      mergeMap((action: GetLeaderboardAction) =>
        from(_getUsers()).pipe(
          map((users: any) => {
            // start loading bar
            this.loadingBar.start();
            // call success get questions action
            return new GetLeaderboardSuccessAction(users);
          }),
          catchError((err) => of(new GetLeaderboardFailedAction(err)))
        )
      )
    )
  );

  leaderboardSuccessEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(GET_LEADERBOARD_SUCCESS),
        tap((action: GetLeaderboardSuccessAction) => {
          // complete loading bar
          this.loadingBar.complete();
        })
      ),
    { dispatch: false }
  );

  leaderboardFailedEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(GET_LEADERBOARD_FAILED),
        tap((action: GetLeaderboardFailedAction) => {
          // create snack bar message
          let message = action.payload;

          // open snack bar
          this.snackBar.openFromComponent(MessageSnackbarComponent, {
            data: { message },
            verticalPosition: 'top',
            panelClass: ['failedsnackBar'],
            duration: 3000,
          });

          // complete loading bar
          this.loadingBar.complete();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions: Actions,
    private loadingBar: LoadingBarService,
    public snackBar: MatSnackBar
  ) {}
}
