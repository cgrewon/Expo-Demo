import { combineReducers } from "redux";

import { CLEAN_TOKEN, CLEAN_USER, UPDATE_FETCHIGN_USER, UPDATE_TOKEN, UPDATE_USER } from "./actions";

import { IMyUser, IToken } from "../graphql/interfaces";

const user = (user: IMyUser | null = null, action: any) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...user, ...action.newUser };
    case CLEAN_USER:
      return {};
    default:
      return user;
  }
};

const token = (token: IToken | null = null, action: any) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return { ...token, ...action.newToken };
    case CLEAN_TOKEN:
      return {};
    default:
      return token;
  }
};

const fetchingUser = (fetchingUser:boolean | null = null , action: any) => {
  switch (action.type) {
    case UPDATE_FETCHIGN_USER:
      return action.fetching
    default:
      return fetchingUser;
  }
}




export default combineReducers({ user, token, fetchingUser });
