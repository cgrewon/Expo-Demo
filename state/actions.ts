import { IMyUser, IToken } from "../graphql/interfaces";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_TOKEN = "UPDATE_TOKEN";

export const CLEAN_TOKEN = "CLEAN_TOKEN";
export const CLEAN_USER = "CLEAN_USER";

export const UPDATE_FETCHIGN_USER = "UPDATE_FETCHIGN_USER";



export const updateUser = (newUser: IMyUser) => ({
  type: UPDATE_USER,
  newUser,
});

export const updateToken = (newToken: IToken) => ({
  type: UPDATE_TOKEN,
  newToken,
});

export const updateFetchingUser = (fetching: boolean) => ({
  type: UPDATE_FETCHIGN_USER,
  fetching,
});



export const cleanUser = ()=>({
  type: CLEAN_USER,
})
export const cleanToken = ()=>({
  type: CLEAN_TOKEN,
})


