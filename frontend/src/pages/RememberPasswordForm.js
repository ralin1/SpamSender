import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField_" htmlFor="email">Jeśli zapomniałeś hasło, wpisz adres:</label>
                <input type="text" id="email" className="FormField__Input"  name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20">Wyślij</button>
              </div>
            </form>
          </div>
        );
    }
}

export default SignUpForm;
