import React, {Component} from 'react';
import {browserHistory} from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";

const url = 'http://127.0.0.1:8000/find_user/';


class FindContacts extends Component {
    constructor() {
        super();

        this.state = {
            tag: "",
            current_state: 'czekam na tag'
        };

        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.setState({
            current_state: 'przetwarzam'
        });
        var a = this
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(this.state),
            headers: {
                Accept: 'application/json'
            }
        }).then(response => response.json())
            .then(function (json) {
                // console.log(response.status);
                console.log(json["username"], json["screen_name"]);
                for (let i = 0; i < json["username"].length; i++) {
                    console.log(json["username"][i]);
                    console.log(json["screen_name"][i]);
                    // arrayOfData.push({id: json["text"][i]["text"], name: json["name"][i]})
                }
                a.setState({
                    current_state: json["username"].length + " osoby pisały na ten temat."
                });
                // if (response.status === 200) {
                //     alert("Wynik");
                // } else if (response.status === 205) {
                //     alert("Tag jest pusty");
                // } else alert("Błąd");
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
            <body>
            <p className="margin">Wpisz tag w celu znalezienia liczby odbiorców</p>
            <input placeholder="Wpisz tag" name="tag" value={this.state.tag} onChange={this.handleChange}/>
            <div>
                <button className="FormField__Button mr-20" onClick={this.onClick}>Szukaj Kontaktów</button>
            </div>
            <div className="margin">
                Status: {this.state.current_state}
            </div>
            </body>
        );
    }
}

export default FindContacts;
