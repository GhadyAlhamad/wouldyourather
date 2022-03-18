import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetUsersAction } from 'src/app/data/store/actions/user.action';
import { authFS, userStateFS } from 'src/app/data/store/selectors/all.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/data/store/store';
import { UserState } from 'src/app/data/store/reducers/user.reducer';
import { Users } from 'src/app/data/_DATA';
import { AuthenticateUserAction } from 'src/app/data/store/actions/auth.action';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  // properties
  users: Users = {};
  userKey: any;
  objectKeys = Object.keys;
  isLoaded: boolean = false;

  constructor(
    private store: Store<State>,
    private router: Router,
    public snackBar: MatSnackBar,
    private loadingBar: LoadingBarService
  ) {
    // subscribe to authentication store
    this.store.select(authFS).subscribe((auth: any) => {
      // check if already logged in
      if (auth != null && router.url == '/login') {
        // navigate to home
        this.router.navigate(['home']);
      }
    });

    // subscribe to users store
    this.store.select(userStateFS).subscribe((userState: UserState) => {
      if (userState != undefined && userState.users != undefined) {
        // set users
        this.users = userState.users;

        let firstKey: any = this.objectKeys(this.users)[0];
        this.userKey = this.users[firstKey]['id'];
        // set is load to true
        this.isLoaded = true;
        // complete loading bar
        this.loadingBar.complete();
      }
      // set is load to true
      this.isLoaded =
        userState != undefined && userState != null ? true : false;
    });
  }

  ngOnInit(): void {
    // start loading bar
    this.loadingBar.start();
    // dispatch get users action
    this.store.dispatch(new GetUsersAction());
  }

  login() {
    // dispatch get authenticate user action
    this.store.dispatch(new AuthenticateUserAction(this.userKey));
  }
  // read user name by key
  readUsernameByKey(key: any) {
    return this.users[key]['name'];
  }
}
