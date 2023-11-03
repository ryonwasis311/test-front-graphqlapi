import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!, $role: String!) {
    user:signUp(name: $name, email: $email, password: $password, role: $role)
    {
      data
    }
  }
  
`

export const SIGNIN_USER = gql`
  mutation SignIn($name: String!, $email: String!, $password: String!) {
    signIn(name: $name, email: $email, password: $password)
}
  
`