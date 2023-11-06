import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!, $role: String!) {
    token:signUp(name: $name, email: $email, password: $password, role: $role)
    
  }
`

export const SIGNIN_USER = gql`
  mutation SignIn($name: String!, $email: String!, $password: String!) {
    token:signIn(name: $name, email: $email, password: $password)
}
`

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      email
      id
      name
  }
}
`
export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: String!) {
    deleteUser(id: $deleteUserId) {
      email
      id
      name
  }
}
`