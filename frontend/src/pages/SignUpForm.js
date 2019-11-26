import React, {Component} from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
import Logo from "../logo1.png";

const url = 'http://127.0.0.1:8000/signup/';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            repassword: '',
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        // const {password, confirmPassword} = this.state
        // if (password !== confirmPassword) {
        //     alert("Passwords don't match");
        // } else {
        //     // make API call
        //}
        this.setState({
            [name]: value

        });
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

    handleSubmit(e) {
        var a = this;
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(this.state),
            headers: {
                Accept: 'application/json'
            }
        }).then(function (response) {
            console.log(response.status);
            if (response.status === 200) {
                console.log("Redirect");
                alert("Konto zostało utworzone. Teraz możesz się zalogować.");
                a.setRedirect();
                // return <NavLink to='/main'/>;
            } else alert("Błąd rejestracji");
        });
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
                                <label className="FormField__Label" htmlFor="email">Poczta</label>
                                <input type="text" id="email" className="FormField__Input" name="email"
                                       value={this.state.email} onChange={this.handleChange}
                                       placeholder="Wpisz swój email"/>
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password">Hasło</label>
                                <input type="password" id="password" className="FormField__Input" name="password"
                                       value={this.state.password} onChange={this.handleChange}
                                       placeholder="Wpisz swoje hasło"/>
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="email">Powtórz hasło</label>
                                <input type="password" id="repassword" className="FormField__Input" name="repassword"
                                       value={this.state.repassword} onChange={this.handleChange}
                                       placeholder="Powtórz hasło"/>
                            </div>
                            <div className="FormField">
                                {this.renderRedirect()}
                                <button className="FormField__Button mr-20">Rejestracja</button>
                                {/*<Link to="/sign-in" className="FormField__Link">Zarejestrowany?</Link>*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default SignUpForm;
