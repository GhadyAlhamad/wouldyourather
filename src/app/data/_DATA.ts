import * as storage from './store/storage';

let users: Users = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: 'user5.png',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo',
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: 'user8.png',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  johndoe: {
    id: 'johndoe',
    name: 'John Doe',
    avatarURL: 'user3.png',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo',
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
};

let questions: Questions = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory',
    },
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'johndoe',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero',
    },
    optionTwo: {
      votes: ['johndoe', 'sarahedo'],
      text: 'become a supervillain',
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'sarahedo',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'be telepathic',
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylermcginnis',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'be a back-end developer',
    },
  },
  vthrdm985a262al8qx3do: {
    id: 'vthrdm985a262al8qx3do',
    author: 'tylermcginnis',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['tylermcginnis'],
      text: 'find $50 yourself',
    },
    optionTwo: {
      votes: ['johndoe'],
      text: 'have your best friend find $500',
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'johndoe',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['johndoe'],
      text: 'write JavaScript',
    },
    optionTwo: {
      votes: ['tylermcginnis'],
      text: 'write Swift',
    },
  },
};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getUsers(): Promise<Users> {
  return new Promise((res, rej) => {
    // read users: added by ghady
    users =
      storage.getItem('userState') != null
        ? { ...storage.getItem('userState').users }
        : { ...users };

    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getQuestions(): Promise<Questions> {
  return new Promise((res, rej) => {
    // read questions: added by ghady
    questions =
      storage.getItem('questionState') != null
        ? storage.getItem('questionState').questions
        : { ...questions };

    setTimeout(() => res({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }: any) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

// added by ghady
function formatUser({ name, avatarURL }: any) {
  return {
    id: name.toLowerCase().replace(/\s/g, ''),
    name: name,
    avatarURL: avatarURL,
    answers: {},
    questions: [],
  };
}

// added by ghady
export function _saveUser(user: any) {
  return new Promise((res, rej) => {
    // read users: added by ghady
    users =
      storage.getItem('userState') != null
        ? { ...storage.getItem('userState').users }
        : { ...users };

    // format user data
    const formattedUser = formatUser(user);

    setTimeout(() => {
      users = {
        ...users,
        [formattedUser.id]: {
          ...formattedUser,
        },
      };

      res({
        user: formattedUser,
        users: users,
      });
    }, 1000);
  });
}

export function _saveQuestion(question: any) {
  return new Promise((res, rej) => {
    // read questions: added by ghady
    questions =
      storage.getItem('questionState') != null
        ? storage.getItem('questionState').questions
        : { ...questions };

    // read users: added by ghady
    users =
      storage.getItem('userState') != null
        ? { ...storage.getItem('userState').users }
        : { ...users };

    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id]),
        },
      };

      res({ questions: questions, users: users });
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }: any) {
  // read questions: added by ghady
  questions =
    storage.getItem('questionState') != null
      ? storage.getItem('questionState').questions
      : { ...questions };

  // read users: added by ghady
  users =
    storage.getItem('userState') != null
      ? { ...storage.getItem('userState').users }
      : { ...users };

  // return type updated by ghady from Promise<void> to Promise<any> to user returned data
  return new Promise<any>((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser]),
          },
        },
      };

      res({ users: users, questions: questions });
    }, 500);
  });
}

// added by ghady
export type Users = {
  [key: string]: {
    id: string;
    name: string;
    avatarURL: string;
    answers: {};
    questions: string[];
  };
};

// added by ghady
export interface Questions {
  [key: string]: {
    [key: string]: any;
  };
}
