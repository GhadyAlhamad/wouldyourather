import { Questions } from '../../_DATA';
import { QuestionState } from '../reducers/question.reducer';
import { User } from '../store';
import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  QUESTIONS_FAILED,
  SAVE_QUESTION,
  SAVE_QUESTION_ANSWER,
  SAVE_QUESTION_ANSWER_SUCCESS,
  SAVE_QUESTION_SUCCESS,
} from '../types/types.constant';

export class GetQuestionsAction {
  type = GET_QUESTIONS;
  payload: User | null; // get question by user

  constructor(payload: User | null) {
    this.payload = payload;
  }
}

export class GetQuestionsSuccessAction {
  type = GET_QUESTIONS_SUCCESS;
  payload: QuestionState | undefined;

  constructor(payload: any, user: any) {
    let questions: Questions = {};
    let answered: number = 0;
    let unAnswered: number = 0;

    // read questions keys
    var questionsKeys = Object.keys(payload);

    // filter questions
    for (var i = 0; i < questionsKeys.length; i++) {
      // read question
      let question: any = payload[questionsKeys[i]];

      if (user.answers[questionsKeys[i]]) {
        answered++;

        // add question with is answered flag true
        questions = {
          ...questions,
          [questionsKeys[i]]: {
            ...question,
            ['isAnswered']: true,
          },
        };
      } else {
        unAnswered++;
        // add question with is answered flag false
        questions = {
          ...questions,
          [questionsKeys[i]]: {
            ...question,
            ['isAnswered']: false,
          },
        };
      }
    }

    // set payload after sort
    let sortQuestionsArray = Object.keys(questions)
      .sort(
        (q1: any, q2: any) =>
          questions[q2]['timestamp'] - questions[q1]['timestamp']
      )
      .map((key) => {
        return { [key]: { ...questions[key] } };
      });

    // convert to object after sort
    questions = Object.assign({}, ...sortQuestionsArray);
    // set payload values
    this.payload = { answered, unAnswered, questions };
  }
}

export class QuestionsFailedAction {
  type = QUESTIONS_FAILED;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class SaveQuestionsAnswerAction {
  type = SAVE_QUESTION_ANSWER;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class SaveQuestionsAnswerSuccessAction {
  type = SAVE_QUESTION_ANSWER_SUCCESS;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class SaveQuestionAction {
  type = SAVE_QUESTION;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class SaveQuestionSuccessAction {
  type = SAVE_QUESTION_SUCCESS;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}
