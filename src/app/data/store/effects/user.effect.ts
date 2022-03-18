import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GET_USERS, SUCCESS_USERS } from '../types/types.constant';
import { map, tap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Users, _getUsers } from 'src/app/data/_DATA';
import { GetUsersSuccessAction } from '../actions/user.action';

@Injectable()
export class UsersEffect {
  // users effect: to retrieve all users
  usersEffect = createEffect(() =>
    this.actions.pipe(
      ofType(GET_USERS),
      switchMap(() =>
        from(_getUsers()).pipe(
          map((data: Users) => {
            // call success users action
            return new GetUsersSuccessAction(data);
          })
        )
      )
    )
  );

  usersSuccessEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(SUCCESS_USERS),
        tap((action: GetUsersSuccessAction) => {})
      ),
    { dispatch: false }
  );

  constructor(private actions: Actions) {}
}
