import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const url = 'http://127.0.0.1:8000/login/';

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
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
            <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">Poczta</label>
                        <input type="email" id="email" className="FormField__Input" placeholder="Wpisz swój email"
                               name="email" value={this.state.email} onChange={this.handleChange}/>
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Hasło</label>
                        <input type="password" id="password" className="FormField__Input"
                               placeholder="Wpisz swóje hasło" name="password" value={this.state.password}
                               onChange={this.handleChange}/>
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Logowanie</button>
                        <Link to="/" className="FormField__Link">Rejestracja</Link>

                    </div>
                    <Link to="/RememberPasswordForm" className="FormField__Link">Zapomniałesz hasło?</Link>
                </form>
            </div>
        );
    }
}

export default SignInForm;
