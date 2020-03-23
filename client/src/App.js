import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';


import './App.css';

const App = () => (
      <BrowserRouter>
      
        <Navbar />
        <Route exact path="/" component={Landing}/>

        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>

      </BrowserRouter>
  )


export default App;
