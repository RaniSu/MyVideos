import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'
import Favorite from './pages/favorite/Favorite'

function App() {
  const { authIsReady, user } = useAuthContext()
  

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            
            <Route  path="/favorite">
              {!user && <Redirect to="/login" />}
              {user && <Favorite />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && user.displayName && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App