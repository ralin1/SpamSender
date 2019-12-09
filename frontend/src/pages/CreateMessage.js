import React, {Component} from 'react';
import {browserHistory} from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";
import '../css/CreateMessage.css'
import DynamicSelect from "../js/DynamicSelect";

import '../App.css';
//Pobieranie zapisanych szablonów z firebase
var arrayOfData = [];

var emptyArray = [
    {
        id: '',
        name: 'Dodaj nowy szablon'
    }
];

var canDeleting = false;

const url = 'http://127.0.0.1:8000/temp/';

class CreateMessage extends Component {
    constructor(props) {
        //load array from DATABASE
        var ToBeReplacedWithDBDataREALLY = [
            {
                id: '1a',
                name: '1b'
            },
            {
                id: '2a',
                name: '2b'
            },
            {
                id: '3a',
                name: '3b'
            },
        ];


        super(props);

        this.state = {
            name: "",
            text: ""
        };

        arrayOfData = emptyArray.concat(ToBeReplacedWithDBDataREALLY)

        this.handleChange = this.handleChange.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.deleteButton = this.deleteButton.bind(this);
    }

    saveButton(e) {
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

    deleteButton(e) {
        fetch('http://127.0.0.1:8000/delete_template/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(this.state),
            headers: {
                Accept: 'application/json'
            }
        }).then(function (response) {
            console.log(response.status);
            if (response.status === 200) {
                alert("Szablon został usunięty");
            } else if (response.status === 204) {
                alert("Wpisz nazwę szablonu");
            } else if (response.status === 205) {
                alert("Nie ma takiego szablonu");
            } else alert("Błąd");
        });
        e.preventDefault();
    }

    handleSelectChange = (selectedValue, selectedId) => {
        if (selectedValue !== "") {
            this.setState({
                text: selectedValue,
                name: arrayOfData.find(a => a.id === selectedValue).name
            });
            canDeleting = true
        } else {
            this.setState({
                text: "",
                name: "",
            });
            canDeleting = false
        }

    };

    appendName = (e) => {
        this.setState({
            text: this.state.text + "{" + e + "}"
        });
    };

    render() {
        return (
            <body className="text_form">

            <div>
                <p htmlFor="text" className="margin">Wybierz szablon:</p>
            </div>
            <DynamicSelect arrayOfData={arrayOfData} onSelectChange={this.handleSelectChange}/>
            <br/><br/>
            <p className="margin">Nazwa szablonu:</p>
            <div>
                <input placeholder="Nazwa" id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
            </div>
            <p className="margin">Dodaj dynamiczne pole do treści:</p>
            <button className="FormField__Button mr-20" name="name" onClick={(e) => this.appendName("name")}>Imię i
                nazwisko
            </button>
            <button className="FormField__Button mr-20" name="username"
                    onClick={(e) => this.appendName("username")}>Nazwa użytkownika
            </button>
            <button className="FormField__Button mr-20" name="city" onClick={(e) => this.appendName("city")}>Miasto
            </button>
            <p className="margin">Treść:</p>
            <div>
                <textarea id="text" name="text" value={this.state.text} onChange={this.handleChange}/>
            </div>
            <button className="FormField__Button mr-20" onClickCapture={this.deleteButton}>Usuń szablon</button>
            <button className="FormField__Button mr-20" onClickCapture={this.saveButton}>Zapisz szablon</button>
            </body>
        );
    }
}

export default CreateMessage;
