import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Users } from 'src/app/data/_DATA';
import { State, User } from 'src/app/data/store/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  // properties
  selectedInex: number = 1;
  questions: any = null;
  answeredQuestions: any = {};
  unAnsweredQuestions: any = {};
  users: Users = {};
  user!: User | null;
  answered: number = 0;
  unAnswered: number = 0;
  objectKeys = Object.keys;

  constructor(private store: Store<State>) {
    // subscribe store state
    this.store.subscribe((state: State) => {
      if (state) {
        if (state.questionState != null) {
          // read questions
          this.questions = state.questionState.questions;
          this.answered = state.questionState.answered;
          this.unAnswered = state.questionState.unAnswered;
        }

        // read user list
        if (state.userState != null) {
          this.users = state.userState?.users;
        }

        // read user data
        if (state.auth != undefined) {
          this.user = state?.auth?.user;
        }
      }
    });
  }
  getUserName(userId: any): string {
    return this.users[userId] != null && this.users[userId] != undefined
      ? this.users[userId].name
      : '';
  }

  getUserAvatarURL(userId: any): string {
    if (this.users[userId] != null && this.users[userId] != undefined) {
      return this.users[userId].avatarURL.indexOf('data:image') != -1
        ? this.users[userId].avatarURL
        : `../../../assets/photos/${this.users[userId].avatarURL}`;
    } else return '';
  }

  ngOnInit(): void {}
}
