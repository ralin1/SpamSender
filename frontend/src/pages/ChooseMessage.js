import React, {Component} from 'react';
import {browserHistory} from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";

import '../css/ChooseMessage.css'

import '../App.css';
import DynamicSelect from '../js/DynamicSelect';
//Pobieranie zapisanych szablonów z firebase
const url = 'http://127.0.0.1:8000/get_template/';

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

class ChooseMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 'Nothing selected'
        };

        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify("Hello"),
            headers: {
                Accept: 'application/json'
            }
        }).then(response => response.json())
            .then(json => console.log(json));
        //     .then(function (response) {
        //     console.log(response.json());
        //     if (response.status === 200) {
        //         alert("Wynik");
        //     } else if (response.status === 205) {
        //         alert("Tag jest pusty");
        //     } else alert("Błąd");
        // }).then(json => console.log(json[0]));
        // e.preventDefault();
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
            <body className="textForm">
            <div>
                <label>TAG:</label>
            </div>
            <div>
                <input className="tag" placeholder="Wpisz tag"/>
            </div>
            <div>
                <label for="text">Wybierz szablon:</label>
            </div>
            <DynamicSelect arrayOfData={arrayOfData} onSelectChange={this.handleSelectChange}/> <br/><br/>

            {/*<div>*/}
            {/*    <textarea id="text" name="text">Text</textarea>*/}
            {/*</div>*/}
            <button className="button" for="text" onClickCapture={this.onClick}>Wyślij</button>


            <div>
                Taki wynik: {this.state.selectedValue}
            </div>
            </body>
        );
    }
}

export default ChooseMessage;
