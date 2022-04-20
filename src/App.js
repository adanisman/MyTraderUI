import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
//import Login from './myComponents/Login/Login'
import AuthContext from './store/auth-context'
import Login from './views/pages/login/Login'
import Register from './views/pages/register/Register'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const LoginMain = React.lazy(() => import('./views/pages/login/Login'))
const Registerx = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// return (
//   <AuthContext.Provider
//     value={{
//       isLoggedIn: isLoggedIn,
//       isTrial: isTrial,
//       onLogout: logoutHandler,
//       changeTrial: trialHandler,
//       getTrial: getTrialHandler,
//     }}
//   >
//     <MainHeader onLogout={logoutHandler} />
//     <main>
//       {!isLoggedIn && <Login onLogin={loginHandler} />}
//       {isLoggedIn && <Home onLogout={logoutHandler} />}
//     </main>
//   </AuthContext.Provider>
// );

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  console.log('Burada..')
  useEffect(() => {
    const storedUserLoggedInformation = localStorage.getItem('isLoggedIn')
    console.log(storedUserLoggedInformation)
    if (storedUserLoggedInformation === '1') {
      console.log(storedUserLoggedInformation)
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    console.log('LogOut clicked')
    setIsLoggedIn(false)
    localStorage.setItem('isLoggedIn', '0')
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
      }}
    >
      <div>
        <Router>
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
        </Router>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && (
          <HashRouter>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route
                  exact
                  path="/login"
                  name="Login Page"
                  render={(props) => <LoginMain {...props} />}
                />
                <Route
                  exact
                  path="/register"
                  name="Register Page"
                  render={(props) => <Registerx {...props} />}
                />
                <Route
                  exact
                  path="/404"
                  name="Page 404"
                  render={(props) => <Page404 {...props} />}
                />
                <Route
                  exact
                  path="/500"
                  name="Page 500"
                  render={(props) => <Page500 {...props} />}
                />

                <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
              </Switch>
            </React.Suspense>
          </HashRouter>
        )}
      </div>
    </AuthContext.Provider>
  )
}

export default App
