import React, {Component} from 'react';
import {browserHistory} from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";

const url = 'http://127.0.0.1:8000/find_user/';

class FindContacts extends Component {

    constructor() {
        super();

        this.state = {
            tag: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
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
                alert("Wynik");
            } else if (response.status === 205) {
                alert("Tag jest pusty");
            } else alert("Błąd");
        });
        e.preventDefault();
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <p className="margin">Wpisz tag w celu znalezienia liczby odbiorców</p>
                <input placeholder="Wpisz tag" name="tag" value={this.state.tag} onChange={this.handleChange}/>
                <div>
                    <button className="FormField__Button mr-20" onClickCapture={this.onClick}>Szukaj Kontaktów</button>
                </div>
            </div>
        );
    }
}

export default FindContacts;
