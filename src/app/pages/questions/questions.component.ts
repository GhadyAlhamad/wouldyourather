import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MessageSnackbarComponent } from 'src/app/components/messagesnackbar/messagesnackbar.component';
import { formatFloat } from 'src/app/data/global';
import { SaveQuestionsAnswerAction } from 'src/app/data/store/actions/question.action';
import { authFS } from 'src/app/data/store/selectors/all.selector';
import { State } from 'src/app/data/store/store';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.less'],
})
export class QuestionsComponent implements OnInit {
  // question
  username: string = '';
  questionId: any;
  avatarURL: string = '';
  optionOne: string = '';
  optionTwo: string = '';
  authedUser: any;
  selected: string = 'optionOne';

  // statistics
  isAnswered: boolean = false;
  optionOneCount: number = 0;
  optionTwoCount: number = 0;
  optionOneRate: number = 0;
  optionTwoRate: number = 0;

  isDisabled: boolean = false;

  stateSubscribe: any;
  authSubscribe: any;

  constructor(
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router,
    private loadingBar: LoadingBarService,
    private store: Store<State>
  ) {
    // read question id
    this.questionId = this.route.snapshot.paramMap.get('question_id');

    // subscribe to authentication store
    this.authSubscribe = this.store.select(authFS).subscribe((auth: any) => {
      // Auth state
      if (auth != null) {
        // read authenticated user
        this.authedUser = auth.user;

        if (this.authedUser.answers[this.questionId] != undefined) {
          this.selected = this.authedUser.answers[this.questionId];
        }
      }
    });

    // subscribe to store
    this.stateSubscribe = this.store.subscribe((state: State) => {
      // 1: Question state
      if (
        state.questionState != null &&
        state.questionState.questions &&
        this.questionId != null
      ) {
        // read question
        let question: any = state.questionState.questions[this.questionId];

        // if question not found
        if (question == undefined) {
          // unsubscribe all states
          this.stateSubscribe.unsubscribe();
          this.authSubscribe.unsubscribe();

          // navigate to 404 page
          this.router.navigate(['404']);
        } else {
          this.optionOne = question.optionOne.text;
          this.optionTwo = question.optionTwo.text;
          this.isAnswered = question.isAnswered;

          // set statistics
          if (question.isAnswered) {
            this.setQuestionStatistics(question);
          }

          if (
            state.questionState != null &&
            question.isAnswered &&
            this.isDisabled
          ) {
            // create snack bar message
            var message = 'Your Answer saved successfully!';

            // open snack bar
            this.snackBar.openFromComponent(MessageSnackbarComponent, {
              data: { message },
              verticalPosition: 'top',
              panelClass: ['successsnackBar'],
              duration: 3000,
            });

            // complete loading bar
            this.loadingBar.complete();

            // unsubscribe all states
            this.stateSubscribe.unsubscribe();
            this.authSubscribe.unsubscribe();
          }
        }

        // 2: user state
        if (state.userState != null) {
          // read user state
          let userState: any = state.userState;
          // read user who ask question
          let user: any = userState.users[question['author']];

          // set question data
          this.username = user.name;
          this.avatarURL =
            user.avatarURL != undefined &&
            user.avatarURL.indexOf('data:image') != -1
              ? user.avatarURL
              : `../../../assets/photos/${user.avatarURL}`;
        }
      }
    });
  }

  ngOnInit(): void {}

  // view poll event
  viewPoll() {
    // define auth state
    let question_answer: any = {
      authedUser: this.authedUser,
      qid: this.questionId,
      answer: this.selected,
    };

    // disable button
    this.isDisabled = true;

    // dispatch save question answer action
    this.store.dispatch(new SaveQuestionsAnswerAction(question_answer));
  }

  // destroy
  ngOnDestroy(): void {
    // unsubscribe all states
    this.stateSubscribe.unsubscribe();
    this.authSubscribe.unsubscribe();
  }

  // get styles
  getStyles(rate: number) {
    let myStyles = {
      left: rate != 0 ? 'calc(' + rate / 2 + '% - 12px)' : '12px',
    };
    return myStyles;
  }

  // set question statistics
  setQuestionStatistics(question: any) {
    let optionOneCount: number = question['optionOne']['votes'].length;
    let optionTwoCount: number = question['optionTwo']['votes'].length;
    let optionOneRate: number =
      optionOneCount / (optionOneCount + optionTwoCount);
    let optionTwoRate: number =
      optionTwoCount / (optionOneCount + optionTwoCount);

    this.optionOneCount = optionOneCount;
    this.optionTwoCount = optionTwoCount;
    this.optionOneRate = formatFloat((optionOneRate * 100).toFixed(1));
    this.optionTwoRate = formatFloat((optionTwoRate * 100).toFixed(1));
  }
}
