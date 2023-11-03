import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
 query Users {
  users {
    email
    id
    name
  }

}
`

export const GET_USER = gql`
  query User {
  user {
    email
    id
    name
  }
}
`