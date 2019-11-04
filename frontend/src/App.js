import React, {Component} from 'react';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import RememberPasswordForm from './pages/RememberPasswordForm';
import MainScreen from './pages/MainScreen';
import Logo from './logo1.png';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router basename="/react-auth-ui/">
                <Route exact path="/" component={SignUpForm}/>
                <Route path="/sign-in" component={SignInForm}/>
                <Route path="/RememberPasswordForm" component={RememberPasswordForm}/>
                <Route path="/MainScreen" component={MainScreen}/>
            </Router>
        );
    }
}

export default App;
