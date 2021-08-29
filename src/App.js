import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import NavBar from './components/NavBar'
import NotFoundPage from './pages/NotFoundPage'
import SharePage from './pages/SharePage'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import EditPage from './pages/EditPage'
import { AuthProvider } from "./contexts/AuthContext"



function App() {

  return (
    <div>
      <AuthProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/user/:username' component={UserPage} />
            <Route path='/share' component={SharePage} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/signin' component={SigninPage} />
            <Route path='/edit' component={EditPage} />
            <Route path='*' component={NotFoundPage} />
          </Switch>
        </Router>
      </AuthProvider>
      
    </div>
    
  );
}

export default App;
