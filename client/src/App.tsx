import { Amplify } from '@aws-amplify/core'
import { Admin, Resource } from 'react-admin'
import { createBrowserHistory as createHistory } from 'history'

import amplifyAuthConfig from './config/amplifyAuthConfig'
import authProvider from './providers/authProvider'
import useDataProvider from './providers/useDataProvider'
import { Dashboard, NotFound, CustomersList, CustomerEdit, CustomerCreate } from './pages'

const history = createHistory()

Amplify.configure(amplifyAuthConfig) // for cognito

const App = () => {
  const { dataProvider } = useDataProvider()

  if (!dataProvider) return <p>Loading...</p>

  return (
    <Admin
      catchAll={NotFound}
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      history={history}
    >
      <Resource name="customers" list={CustomersList} edit={CustomerEdit} create={CustomerCreate} />
    </Admin>
  )
}

export default App
