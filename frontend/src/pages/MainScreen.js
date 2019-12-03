import React, {Component} from 'react';
import {HashRouter as Router, Route, NavLink, Link, IndexRoute, hashHistory, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import '../css/menu.css'
import '../js/menu.js'
import $ from 'jquery'
import Logo from "../logo1.png";
import SignUpForm from "./SignUpForm";
import ChooseMessage from "./ChooseMessage"
import CreateMessage from "./CreateMessage"
import FindContacts from "./FindContacts"
import GetMails from "./GetMails"
import HelpPage from "./HelpPage"
import SignInForm from "./SignInForm";

function logout() {
    fetch('http://127.0.0.1:8000/logout/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify("wyloguj"),
        headers: {
            Accept: 'application/json'
        }
    }).then(function (response) {
        console.log(response.status);
        if (response.status === 200) {
            console.log("Redirect");
            this.setRedirect();
            // return <NavLink to='/sign-in'/>;
        } else alert("Błąd wylogowania");
    });
}

class MainScreen extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        };
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/sign-in'/>
        }
    };
    render() {
        return <div id="wrapper" className="App">
            <div className="App__Aside_main">
                <nav className="no-space navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper"
                     role="navigation">
                    <ul className="nav sidebar-nav">
                        <li>
                            <a>
                                <img src={Logo} className="center"/>
                            </a>
                        </li>
                        <li>
                            <NavLink to={"/main/ChooseMessage"}>Redaguj wiadomość</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/main/CreateMessage"}>Zarządzaj szablonami</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/main/FindContacts"}>Szukaj odbiorców</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/main/GetMails"}>Odebrane</NavLink>
                        </li>
                        <li>
                            {this.renderRedirect()}
                            <NavLink to={"/main/HelpPage"}>Moze cos jeszcze???</NavLink>
                        </li>
                        <li>
                            <a onClick={this.setRedirect}>Wyloguj</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="App__Form">
                <Route path="/main/ChooseMessage" component={ChooseMessage}/>
                <Route path="/main/CreateMessage" component={CreateMessage}/>
                <Route path="/main/FindContacts" component={FindContacts}/>
                <Route path="/main/GetMails" component={GetMails}/>
                <Route path="/main/HelpPage" component={HelpPage}/>
                <Route path="/sign-in" component={SignInForm}/>
            </div>
        </div>
    }
}

export default MainScreen