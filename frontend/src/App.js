import React, {Component} from 'react';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import RememberPasswordForm from './pages/RememberPasswordForm';
import MainScreen from "./pages/MainScreen";
import Logo from './logo1.png';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router basename="/react-auth-ui/">
                <Route exact path="/" component={SignUpForm}>
                </Route>
                <Route path="/sign-in" component={SignInForm}>
                </Route>
                <Route path="/RememberPasswordForm" component={RememberPasswordForm}>
                </Route>
                <Route path="/main" component={MainScreen}>
                </Route>
            </Router>
        );
    }
}

export default App;
