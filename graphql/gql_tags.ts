import { gql } from "@apollo/client";

export const CreateTokenGql = gql`
  mutation CreateToken($email: String, $password: String) {
    createTokenByPassword(email: $email, password: $password) {
      token {
        accessToken
        expiresIn
        refreshToken
      }
    }
  }
`;
export const CreateUserGql = gql`
  mutation CreateUser(
    $email: String
    $firstName: String
    $lastName: String
    $password: String
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      success
      token {
        accessToken
        expiresIn
        refreshToken
      }
    }
  }
`;

export const MyUserGql = gql`
  query MyUser {
    myUser {
      id
      firstName
      lastName
      email
    }
  }
`;
