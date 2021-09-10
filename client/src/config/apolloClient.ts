import { ApolloClient, InMemoryCache } from '@apollo/client'

export const createApolloClient = async token => {
  return new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
