import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MessageSnackbarComponent } from 'src/app/components/messagesnackbar/messagesnackbar.component';
import { SaveQuestionAction } from 'src/app/data/store/actions/question.action';
import { QuestionState } from 'src/app/data/store/reducers/question.reducer';
import {
  authFS,
  questionStateFS,
} from 'src/app/data/store/selectors/all.selector';
import { State } from 'src/app/data/store/store';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
})
export class AddComponent implements OnInit {
  // properties
  addQuestionForm!: FormGroup;
  isDisabled: boolean = false;
  authedUser: any;
  unAnswered: number = -1;

  authSubscribe: any;
  stateSubscribe: any;

  constructor(
    private store: Store<State>,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private loadingBar: LoadingBarService
  ) {
    // subscribe to authentication store
    this.authSubscribe = this.store.select(authFS).subscribe((auth: any) => {
      // Auth state
      if (auth != null) {
        // read authenticated user
        this.authedUser = auth.user;
      }
    });

    // subscribe to store
    this.stateSubscribe = this.store
      .select(questionStateFS)
      .subscribe((questionState: QuestionState) => {
        if (questionState != null && this.isDisabled) {
          if (this.unAnswered != questionState.unAnswered && this.isDisabled) {
            // re-enable
            this.isDisabled = false;
            // create snack bar message
            let message = 'Your Question added successfully !';

            // open snack bar
            this.snackBar.openFromComponent(MessageSnackbarComponent, {
              data: { message },
              verticalPosition: 'top',
              panelClass: ['successsnackBar'],
              duration: 3000,
            });

            // complete loading bar
            this.loadingBar.complete();
            // navigate to 'home'
            this.router.navigate(['home']);
          }

          this.unAnswered = questionState.unAnswered;
        }
      });
  }
  ngOnInit(): void {
    this.reactiveForm();
  }

  /* initializeeactive form */
  reactiveForm() {
    this.addQuestionForm = this.formBuilder.group({
      optionOneText: ['', Validators.required],
      optionTwoText: ['', Validators.required],
    });
  }

  // destroy
  ngOnDestroy(): void {
    // unsubscribe all states
    this.stateSubscribe.unsubscribe();
    this.authSubscribe.unsubscribe();
  }

  submit() {
    // check filling required data
    if (!this.addQuestionForm.valid) {
      // create snack bar message
      let message = 'Please Make sure that all inputs filled correctly';

      // open snack bar
      this.snackBar.openFromComponent(MessageSnackbarComponent, {
        data: { message },
        verticalPosition: 'top',
        panelClass: ['failedsnackBar'],
        duration: 3000,
      });
    } else {
      // define question data
      let question: any = {
        ...this.addQuestionForm.value,
        ['authedUser']: this.authedUser,
      };
      // start loading bar
      this.loadingBar.start();

      // disable button
      this.isDisabled = true;

      // dispatch save question action
      this.store.dispatch(new SaveQuestionAction(question));
    }
  }
}
