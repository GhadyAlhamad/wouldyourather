import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AuthState } from '../data/store/reducers/auth.reducer';
import * as storage from '../data/store/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(auth: AuthState): Observable<AuthState> {
    return of(auth).pipe(
      delay(1000),
      tap((val) => {
        // store auth in local storage
        storage.saveItem('auth', JSON.stringify(auth));
      })
    );
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap((val) => {
        // store auth in local storage
        storage.deleteItemByKey('auth');
        storage.clearStorage();
      })
    );
  }
}
