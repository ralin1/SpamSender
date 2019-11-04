import React, {Component} from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
import Logo from "../logo1.png";
import SignInForm from "./SignInForm";

const url = 'http://127.0.0.1:8000/react-auth-ui/MainScreen/';

class MainScreen extends Component {
    constructor() {
        super();

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (<div><input type="email" name="email"/></div>)
    }
}

export default MainScreen;