import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import RememberPasswordForm from './pages/RememberPasswordForm';
import Logo from './logo1.png';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="App__Aside">
            <img src={Logo} alt="logo" class="center"/>
          </div>
          <div className="App__Form">
            <div className="PageSwitcher">
                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Logowanie</NavLink>
                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Rejestracja</NavLink>
              </div>
              <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Logowanie</NavLink> lub
                  <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Rejestracja</NavLink>
              </div>
              <Route exact path="/" component={SignUpForm}>
              </Route>
              <Route path="/sign-in" component={SignInForm}>
              </Route>
              <Route path="/RememberPasswordForm" component={RememberPasswordForm}>
              </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
