import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";

const url = 'http://127.0.0.1:8000/reset/';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                Accept: 'application/json'
            }
        }).then(r => r.json());
        e.preventDefault();
    }

    render() {
        return (
            <div className="App">
                <div className="App__Aside">
                    <img src={Logo} alt="logo" className="center"/>
                </div>
                <div className="App__Form">
                    <div className="PageSwitcher">
                        <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active"
                                 className="PageSwitcher__Item">Logowanie</NavLink>
                        <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active"
                                 className="PageSwitcher__Item">Rejestracja</NavLink>
                    </div>
                    <div className="FormTitle">
                        <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active"
                                 className="FormTitle__Link">Logowanie</NavLink> lub
                        <NavLink exact to="/" activeClassName="FormTitle__Link--Active"
                                 className="FormTitle__Link">Rejestracja</NavLink>
                    </div>
                    <div className="FormCenter">
                        <form onSubmit={this.handleSubmit} className="FormFields">
                            <div className="FormField">
                                <label className="FormField_" htmlFor="email">Jeśli zapomniałeś hasło, wpisz
                                    adres:</label>
                                <input type="text" id="email" className="FormField__Input" name="email"
                                       value={this.state.email} onChange={this.handleChange}/>
                            </div>
                            <div className="FormField">
                                <button className="FormField__Button mr-20">Wyślij</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpForm;
