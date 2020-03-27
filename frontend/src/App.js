import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import Alert from './components/layout/Alert.js';
import Dashboard from './components/dashboard/Dashboard.js';
import PrivateRoute from './components/routing/PrivateRoute.js';
import CreateProfile from './components/profile-forms/CreateProfile.js';
import EditProfile from './components/profile-forms/EditProfile.js';

// Redux imports
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { loadUser } from './redux/actions/auth.actions';
import setAuthToken from './helpers/setAuthToken.js';

import './App.css';

// Jeżeli w localStorage znajduje sie już token dodaj go do header'a wszystkich zapytań
if(localStorage.getItem('devconnector_token')) {
  setAuthToken(localStorage.getItem('devconnector_token'));
}

const App = () => {
  // Gdy komponent się wyrenderuje po raz pierwszy, pobierz usera (jeżeli nie ma tokena to się nie uda)
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
      
        <Navbar />
        <Route exact path="/" component={Landing}/>

        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
        </section>

      </BrowserRouter>
    </Provider>
  )
}


export default App;
