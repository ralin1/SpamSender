import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const url = 'http://127.0.0.1:8000/signup/';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            repassword: ''
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
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Poczta</label>
                <input type="text" id="email" className="FormField__Input"  name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Hasło</label>
                <input type="password" id="password" className="FormField__Input"  name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Powtórz hasło</label>
                <input type="repassword" id="repassword" className="FormField__Input"  name="repassword" value={this.state.repassword} onChange={this.handleChange} />
              </div>


              <div className="FormField">
                  <button className="FormField__Button mr-20">Rejestracja</button>
                  <Link to="/sign-in" className="FormField__Link">Zarejestrowany?</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignUpForm;
