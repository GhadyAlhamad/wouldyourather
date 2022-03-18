import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GET_QUESTIONS,
  QUESTIONS_FAILED,
  GET_QUESTIONS_SUCCESS,
  SAVE_QUESTION_ANSWER_SUCCESS,
  SAVE_QUESTION_ANSWER,
  SAVE_QUESTION,
  SAVE_QUESTION_SUCCESS,
} from '../types/types.constant';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from 'src/app/components/messagesnackbar/messagesnackbar.component';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../_DATA';
import {
  GetQuestionsAction,
  QuestionsFailedAction,
  GetQuestionsSuccessAction,
  SaveQuestionsAnswerSuccessAction,
  SaveQuestionsAnswerAction,
  SaveQuestionAction,
  SaveQuestionSuccessAction,
} from '../actions/question.action';
import { GetUsersSuccessAction } from '../actions/user.action';
import { RefreshAuthenticateUserAction } from '../actions/auth.action';

@Injectable()
export class QuestionEffect {
  getQuestionsEffect = createEffect(() =>
    this.actions.pipe(
      ofType(GET_QUESTIONS),
      mergeMap((action: GetQuestionsAction) =>
        from(_getQuestions()).pipe(
          map((data: any) => {
            // start loading bar
            this.loadingBar.start();
            // call success get questions action
            return new GetQuestionsSuccessAction(data, action.payload);
          }),
          catchError((err) => of(new QuestionsFailedAction(err)))
        )
      )
    )
  );

  questionsSuccessEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(GET_QUESTIONS_SUCCESS),
        tap((action: GetQuestionsSuccessAction) => {
          // complete loading bar
          this.loadingBar.complete();
        })
      ),
    { dispatch: false }
  );

  saveQuestionAnswerEffect = createEffect(() =>
    this.actions.pipe(
      ofType(SAVE_QUESTION_ANSWER),
      mergeMap((action: SaveQuestionsAnswerAction) =>
        from(
          _saveQuestionAnswer({
            authedUser: action.payload.authedUser.id,
            qid: action.payload.qid,
            answer: action.payload.answer,
          })
        ).pipe(
          map((data: any) => {
            this.loadingBar.start();

            // call success questions answer action
            return new SaveQuestionsAnswerSuccessAction({
              authedUser: action.payload.authedUser,
              questions: data.questions,
              users: data.users,
            });
          }),
          catchError((err) => of(new QuestionsFailedAction(err)))
        )
      )
    )
  );

  saveQuestionAnswerSuccessEffect = createEffect(() =>
    this.actions.pipe(
      ofType(SAVE_QUESTION_ANSWER_SUCCESS),
      mergeMap((action: SaveQuestionsAnswerSuccessAction) => {
        return [
          new GetUsersSuccessAction(action.payload.users),
          new RefreshAuthenticateUserAction({
            questions: action.payload.questions,
            userKey: action.payload.authedUser.id,
          }),
        ];
      })
    )
  );

  saveQuestionEffect = createEffect(() =>
    this.actions.pipe(
      ofType(SAVE_QUESTION),
      mergeMap((action: SaveQuestionAction) => {
        // save question
        return from(
          _saveQuestion({
            optionOneText: action.payload.optionOneText,
            optionTwoText: action.payload.optionTwoText,
            author: action.payload.authedUser.id,
          })
        ).pipe(
          map((data: any) => {
            // dispatch save question success
            return new SaveQuestionSuccessAction({
              authedUser: action.payload.authedUser,
              questions: data.questions,
              users: data.users,
            });
          })
        );
      }),
      catchError((err) => of(new QuestionsFailedAction(err)))
    )
  );

  saveQuestionSuccessEffect = createEffect(() =>
    this.actions.pipe(
      ofType(SAVE_QUESTION_SUCCESS),
      mergeMap((action: SaveQuestionSuccessAction) => {
        return [
          new GetUsersSuccessAction(action.payload.users),
          new RefreshAuthenticateUserAction({
            questions: action.payload.questions,
            userKey: action.payload.authedUser.id,
          }),
        ];
      })
    )
  );

  failedQuestionsEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(QUESTIONS_FAILED),
        tap((action: QuestionsFailedAction) => {
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
    public snackBar: MatSnackBar,
    private loadingBar: LoadingBarService
  ) {}
}
