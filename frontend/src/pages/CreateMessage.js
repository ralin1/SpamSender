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
var ToBeReplacedWithDBDataREALLY = [
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
    }
];

var canDeleting = false;

const url = 'http://127.0.0.1:8000/temp/';

class CreateMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            text: ""
        };

        arrayOfData = emptyArray.concat(ToBeReplacedWithDBDataREALLY)

        this.handleChange = this.handleChange.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.deleteButton = this.deleteButton.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad)
    }

    handleLoad() {
       fetch('http://127.0.0.1:8000/get_template/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify("Hello"),
            headers: {
                Accept: 'application/json'
            }
        }).then(response => response.json())
            .then(function (json) {
                console.log(json["name"], json["text"])
                for (let i = 0; i < json["name"].length; i++) {
                    console.log(json["name"][i]);
                    console.log(json["text"][i]["text"]);
                    arrayOfData.push({id: json["text"][i]["text"], name: json["name"][i]})
                }
            });
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
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

    handleSelectChange = (selectedValue) => {
        if (selectedValue !== "") {
            this.setState({
                text: selectedValue
            });
            canDeleting = true
        } else {
            this.setState({
                text: ""
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
                <label htmlFor="text" className="margin">Wybierz szablon:</label>
            </div>
            <DynamicSelect arrayOfData={arrayOfData} onSelectChange={this.handleSelectChange}/>
            <br/><br/>
            <p className="margin">Nazwa szablonu:</p>
            <div>
                <input placeholder="Nazwa" id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
            </div>
            <p className="margin">Dodaj dynamiczne pole do tekstu:</p>
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

            <div className="margin">
                Taki wynik: {this.state.selectedValue}
            </div>

            </body>
        );
    }
}

export default CreateMessage;
