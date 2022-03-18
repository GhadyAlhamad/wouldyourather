import { Users } from '../../_DATA';
import { GET_USERS, SUCCESS_USERS } from '../types/types.constant';

export class GetUsersAction {
  type: string = GET_USERS;
}

export class GetUsersSuccessAction {
  type: string = SUCCESS_USERS;
  payload: any;

  constructor(users: Users) {
    // set payload
    this.payload = { users };
  }
}
