import React, {Component} from 'react';
import {HashRouter as Router, Route, NavLink, Link, IndexRoute, hashHistory} from 'react-router-dom';
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


class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            ChooseMessage: "/ChooseMessage.js",
            CreateMessage: "/CreateMessage.js",
            FindContacts: "/FindContacts.js",
            HelpPage: "/HelpPage.js"
        };
    }

    ChangingFunction(Content) {
        switch (Content) {
            case ChooseMessage:
                return this.changeContent()
        }
    }

    changeContent(newContent) {
        this.setState({
            content: newContent
        });
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
                            <NavLink to={"/main/HelpPage"}>Moze cos jeszcze???</NavLink>
                        </li>
                        <li>
                            <a href="/">Wyloguj</a>
                        </li>

                        {/*<li className="dropdown">*/}
                        {/*    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Works <span*/}
                        {/*        className="caret"></span></a>*/}
                        {/*    <ul className="dropdown-menu" role="menu">*/}
                        {/*        <li className="dropdown-header">Dropdown heading</li>*/}
                        {/*        <li><a href="#">Action</a></li>*/}
                        {/*        <li><a href="#">Another action</a></li>*/}
                        {/*        <li><a href="#">Something else here</a></li>*/}
                        {/*        <li><a href="#">Separated link</a></li>*/}
                        {/*        <li><a href="#">One more separated link</a></li>*/}
                        {/*    </ul>*/}
                        {/*</li>*/}

                    </ul>
                </nav>
            </div>
            <div className="App__Form">
                <Route path="/main/ChooseMessage" exect component={ChooseMessage}/>
                <Route path="/main/CreateMessage" component={CreateMessage}/>
                <Route path="/main/FindContacts" component={FindContacts}/>
                <Route path="/main/GetMails" component={GetMails}/>
                <Route path="/main/HelpPage" component={HelpPage}/>
            </div>
        </div>
    }
}

export default MainScreen