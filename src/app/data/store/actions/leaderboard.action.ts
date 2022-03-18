import { UserScore } from '../reducers/leaderboard.reducer';
import {
  GET_LEADERBOARD,
  GET_LEADERBOARD_FAILED,
  GET_LEADERBOARD_SUCCESS,
} from '../types/types.constant';

export class GetLeaderboardAction {
  type = GET_LEADERBOARD;
}

export class GetLeaderboardSuccessAction {
  type = GET_LEADERBOARD_SUCCESS;
  payload: any;

  constructor(users: any) {
    // create array for leader board
    let usersScores: UserScore[] = [];
    // read users keys
    var usersKeys = Object.keys(users);

    for (var i = 0; i < usersKeys.length; i++) {
      // read user by key
      let user = users[usersKeys[i]];

      // create user score
      let userScore: UserScore = {
        username: user.name,
        avatarURL: user.avatarURL,
        answeredQuestion: Object.keys(user.answers).length,
        createdQuestion: Object.keys(user.questions).length,
      };

      // push to array
      usersScores.push(userScore);
    }

    // sort users by score
    usersScores = usersScores.sort(
      (userScore1: UserScore, userScore2: UserScore) =>
        userScore2.answeredQuestion +
        userScore2.createdQuestion -
        (userScore1.answeredQuestion + userScore1.createdQuestion)
    );

    // set payload the best 3
    this.payload = {
      usersScores:
        usersScores.length > 3 ? usersScores.slice(0, 3) : usersScores,
    };
  }
}

export class GetLeaderboardFailedAction {
  type = GET_LEADERBOARD_FAILED;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}
