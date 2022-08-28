export interface IToken {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface ICreateTokenByPasswordResult {
  createTokenByPassword: {
    token: IToken;
  };
}

export interface ICreateUserResult {
  createUser: {
    success: boolean;
    token: IToken;
  };
}


export interface IMyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IMyUserResult {
  myUser: IMyUser
}

export interface IError {
  message: string;
}
