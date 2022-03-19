import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AUTHENTICATE_USER,
  AUTHENTICATE_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  REFRESH_AUTHENTICATE_USER,
  REFRESH_AUTHENTICATE_SUCCESS,
  SAVE_USER_FAILED,
  SAVE_USER_SUCCESS,
  SAVE_USER,
} from '../types/types.constant';
import {
  AuthenticateSuccessAction,
  AuthenticateUserAction,
  LogoutAction,
  LogoutSuccessAction,
  RefreshAuthenticateSuccessAction,
  RefreshAuthenticateUserAction,
  SaveUserAction,
  SaveUserFailedAction,
  SaveUserSuccessAction,
} from '../actions/auth.action';
import { map, tap, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Users, _getUsers, _saveUser } from 'src/app/data/_DATA';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from 'src/app/components/messagesnackbar/messagesnackbar.component';
import {
  GetQuestionsAction,
  GetQuestionsSuccessAction,
} from '../actions/question.action';
import { GetUsersSuccessAction } from '../actions/user.action';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable()
export class AuthEffect {
  AuthenticateUserEffect = createEffect(() =>
    this.actions.pipe(
      ofType(AUTHENTICATE_USER),
      switchMap((action: AuthenticateUserAction) =>
        from(_getUsers()).pipe(
          switchMap((users: Users) =>
            from(
              this.authService.login({ user: users[action.payload] }).pipe(
                map((data) => {
                  // call success authenticate user action
                  return new AuthenticateSuccessAction(data);
                })
              )
            )
          )
        )
      )
    )
  );

  AuthenticateUserSuccessEffect = createEffect(() =>
    this.actions.pipe(
      ofType(AUTHENTICATE_SUCCESS),
      map((action: AuthenticateSuccessAction) => {
        // read user data
        let user: any = action.payload.user;
        // create snack bar message
        let message = `Welocme Back!, ${user.name}`;

        // open snack bar
        this.snackBar.openFromComponent(MessageSnackbarComponent, {
          data: { message },
          verticalPosition: 'top',
          panelClass: ['successsnackBar'],
          duration: 3000,
        });

        // navigate to home
        this.router.navigate(['home']);
        // dispatch questions
        return new GetQuestionsAction(user);
      })
    )
  );

  LogoutEffect = createEffect(() =>
    this.actions.pipe(
      ofType(LOGOUT),
      switchMap((action: LogoutAction) => {
        return from(this.authService.logout()).pipe(
          map((flag) => {
            // call success logout action
            return new LogoutSuccessAction();
          })
        );
      })
    )
  );

  LogoutSuccessEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(LOGOUT_SUCCESS),
        tap((action: LogoutSuccessAction) => {
          // create snack bar message
          let message = 'Logged out successfully!';

          // open snack bar
          this.snackBar.openFromComponent(MessageSnackbarComponent, {
            data: { message },
            verticalPosition: 'top',
            panelClass: ['successsnackBar'],
            duration: 3000,
          });

          // navigate to login
          this.router.navigate(['login']);
        })
      ),
    { dispatch: false }
  );

  RefreshAuthenticateUserEffect = createEffect(() =>
    this.actions.pipe(
      ofType(REFRESH_AUTHENTICATE_USER),
      switchMap((action: RefreshAuthenticateUserAction) =>
        from(_getUsers()).pipe(
          switchMap((users: Users) =>
            from(
              this.authService
                .login({ user: users[action.payload.userKey] })
                .pipe(
                  switchMap((data) => [
                    new RefreshAuthenticateSuccessAction({
                      questions: action.payload.questions,
                      user: users[action.payload.userKey],
                    }),
                  ])
                )
            )
          )
        )
      )
    )
  );

  RefreshAuthenticateUserSuccessEffect = createEffect(() =>
    this.actions.pipe(
      ofType(REFRESH_AUTHENTICATE_SUCCESS),
      map((action: RefreshAuthenticateSuccessAction) => {
        // read user data
        let user: any = action.payload.user;
        let questions: any = action.payload.questions;
        // dispatch questions
        return new GetQuestionsSuccessAction(questions, user);
      })
    )
  );

  saveUserEffect = createEffect(() =>
    this.actions.pipe(
      ofType(SAVE_USER),
      mergeMap((action: SaveUserAction) => {
        // save user
        return from(
          _saveUser({
            name: action.payload.name,
            avatarURL: action.payload.avatarURL,
          })
        ).pipe(
          map((data: any) => {
            // dispatch save user success
            return new SaveUserSuccessAction({
              authedUser: data.users[data.user.id],
              users: data.users,
            });
          })
        );
      }),
      catchError((err) => of(new SaveUserFailedAction(err)))
    )
  );

  saveUserSuccessEffect = createEffect(() =>
    this.actions.pipe(
      ofType(SAVE_USER_SUCCESS),
      switchMap((action: SaveUserSuccessAction) => {
        return from(
          this.authService.login({ user: action.payload.authedUser }).pipe(
            switchMap((data) => {
              this.loadingBar.complete();
              return [
                new GetUsersSuccessAction(action.payload.users),
                new AuthenticateSuccessAction(data),
              ];
            })
          )
        );
      })
    )
  );

  failedSaveUserEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(SAVE_USER_FAILED),
        tap((action: SaveUserFailedAction) => {
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
    private authService: AuthService,
    private router: Router,
    private actions: Actions,
    public snackBar: MatSnackBar,
    private loadingBar: LoadingBarService
  ) {}
}
