import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import '../css/menu.css'
import '../js/menu.js'
import $ from 'jquery'
import {Link, NavLink, Redirect} from 'react-router-dom';
import Logo from "../logo1.png";

class MainScreen extends Component{
    render() {
        return <div id="wrapper" className="App">
                <div className="App__Aside_main">
                    <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
                        <ul className="nav sidebar-nav">
                            <li className="sidebar-brand">
                                <a href="#">
                                    Brand
                                </a>
                            </li>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">Events</a>
                            </li>
                            <li>
                                <a href="#">Team</a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Works <span
                                    className="caret"></span></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li className="dropdown-header">Dropdown heading</li>
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>

                        </ul>
                    </nav>
                </div>
                <div className="App__Form">

                </div>
            </div>
    }
}

export default MainScreen