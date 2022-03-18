import {
  AUTHENTICATE_USER,
  AUTHENTICATE_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  REFRESH_AUTHENTICATE_USER,
  REFRESH_AUTHENTICATE_SUCCESS,
  SAVE_USER,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAILED,
} from '../types/types.constant';

export class AuthenticateUserAction {
  type = AUTHENTICATE_USER;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class AuthenticateSuccessAction {
  type = AUTHENTICATE_SUCCESS;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class RefreshAuthenticateUserAction {
  type = REFRESH_AUTHENTICATE_USER;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class RefreshAuthenticateSuccessAction {
  type = REFRESH_AUTHENTICATE_SUCCESS;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class LogoutAction {
  type = LOGOUT;
}

export class LogoutSuccessAction {
  type = LOGOUT_SUCCESS;
}

export class SaveUserAction {
  type = SAVE_USER;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class SaveUserSuccessAction {
  type = SAVE_USER_SUCCESS;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class SaveUserFailedAction {
  type = SAVE_USER_FAILED;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}
