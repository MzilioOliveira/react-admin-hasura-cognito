import { Auth } from '@aws-amplify/auth'

const authProvider = {
  login: ({ username, password }) => {
    return Auth.signIn(username, password).then(() => {
      window.location.href = '/'
      return Promise.resolve()
    })
  },
  checkError: error => {
    const status = error.status
    if (status === 401 || status === 403) {
      Auth.signOut()
      return Promise.reject()
    }
    return Promise.resolve()
  },
  checkAuth: () => {
    return Auth.currentAuthenticatedUser()
      .then(user => {
        if (user) {
          return Promise.resolve()
        }
        return Promise.reject()
      })
      .catch(() => {
        return Promise.reject()
      })
  },
  logout: () => {
    return Auth.signOut().then(() => {
      window.location.href = '/login'
      return Promise.resolve()
    })
  },
  getPermissions: Auth.currentAuthenticatedUser
}

export default authProvider
