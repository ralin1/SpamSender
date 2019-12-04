import React, {Component} from 'react';
import {browserHistory} from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";
import '../css/CreateMessage.css'
import DynamicSelect from "../js/DynamicSelect";

import '../App.css';
//Pobieranie zapisanych szablonów z firebase
const arrayOfData = [
    {
        id: 'Tylko testuje mozliwosci listy',
        name: 'Jerry'
    },
    {
        id: '2 - Elaine',
        name: 'Elaine'
    },
    {
        id: '3 - Kramer',
        name: 'Kramer'
    },
    {
        id: '4 - George',
        name: 'George'
    },
];

const url = 'http://127.0.0.1:8000/temp/';

class CreateMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedValue: 'Nothing selected',
            name: "",
            text: ""
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
                alert("Szablon został zapisany");
            } else if (response.status === 204) {
                alert("Nazwa i treść są wymagane");
            } else if (response.status === 205) {
                alert("Szablon o takiej nazwie już istnieje");
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

    handleSelectChange = (selectedValue) => {
        this.setState({
            selectedValue: selectedValue
        });
    }

    render() {
        return (
            <body className="text_form">

            <div>
                <label htmlFor="text" className="margin">Wybierz szablon:</label>
            </div>
            <DynamicSelect arrayOfData={arrayOfData} onSelectChange={this.handleSelectChange}/>
            <br/><br/>
            <p className="margin">Nazwa szablonu:</p>
            <div>
                <input placeholder="Nazwa" name="name" value={this.state.name} onChange={this.handleChange}/>
            </div>
            <p className="margin">Dodaj dynamiczne pole do tekstu:</p>
            <button className="FormField__Button mr-20" name="name">Imię i nazwisko</button>
            <button className="FormField__Button mr-20" name="username">Nazwa użytkownika</button>
            <button className="FormField__Button mr-20" name="city">Miasto</button>
            <p className="margin">Treść:</p>
            <div>
                <textarea id="text" name="text" value={this.state.text} onChange={this.handleChange}/>
            </div>
            <button className="FormField__Button mr-20" name="edit">Usuń szablon</button>
            <button className="FormField__Button mr-20" onClickCapture={this.onClick}>Zapisz szablon</button>
            <button className="FormField__Button mr-20" name="edit">Dodaj nowy szablon</button>
            <p className="margin">
                Taki wynik: {this.state.selectedValue}
            </p>
            </body>
        );
    }
}

export default CreateMessage;
