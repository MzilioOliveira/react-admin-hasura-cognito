import { useState, useEffect } from 'react'
import { Auth } from '@aws-amplify/auth'
import buildHasuraProvider from 'ra-data-hasura'

import { createApolloClient } from '../config/apolloClient'

const useDataProvider = () => {
  const [dataProvider, setDataProvider] = useState<any>({})

  useEffect(() => {
    const buildDataProvider = async () => {
      const user = await Auth.currentAuthenticatedUser()

      if (!user) {
        return
      }

      const apolloClient = await createApolloClient(user.signInUserSession.idToken.jwtToken)

      const dataProvider = await buildHasuraProvider({
        client: apolloClient
      })

      setDataProvider(() => dataProvider)
    }
    buildDataProvider()
  }, [])

  return { dataProvider }
}

export default useDataProvider
