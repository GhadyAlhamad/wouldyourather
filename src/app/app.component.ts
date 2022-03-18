import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutAction } from './data/store/actions/auth.action';
import { authFS } from './data/store/selectors/all.selector';
import { State } from './data/store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  // properties
  username: string | null = null;
  user_photo: string | null = null;
  screen_width = 0;
  screen_height = 0;

  // constructor
  constructor(private store: Store<State>) {
    // subscribe to user login store
    this.store.select(authFS).subscribe((auth: any) => {
      if (auth != null) {
        // destruct data
        const { name, avatarURL } = auth.user || {};

        // set user info
        this.username = name;
        this.user_photo =
          avatarURL.indexOf('data:image') != -1
            ? avatarURL
            : `../assets/photos/${avatarURL}`;
      } else {
        // reset user info
        this.username = null;
        this.user_photo = null;
      }
    });
  }

  ngOnInit() {
    this.screen_width = window.innerWidth;
  }

  logout() {
    // dispatch get logout action
    this.store.dispatch(new LogoutAction());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screen_width = window.screen.availWidth;
  }
}
