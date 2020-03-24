import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import Alert from './components/layout/Alert.js';

// Redux imports
import { Provider } from 'react-redux';
import store from './redux/store.js';


import './App.css';

const App = () => (
  <Provider store={store}>
        <BrowserRouter>
        
          <Navbar />
          <Route exact path="/" component={Landing}/>

          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>

        </BrowserRouter>
      </Provider>
  )


export default App;
