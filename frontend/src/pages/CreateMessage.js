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

class CreateMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: 'Nothing selected'
        }
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
                <label htmlFor="text">Wybierz szablon:</label>
            </div>
            <DynamicSelect arrayOfData={arrayOfData} onSelectChange={this.handleSelectChange}/>
            <br/><br/>
            <p>Nazwa szablonu:</p>
            <div>
                <input placeholder="Nazwa"/>
            </div>
            <p>Treść:</p>
            <button name="name">Imię i nazwisko</button>
            <button name="username">Nazwa użytkownika</button>
            <button name="city">Miasto</button>
            <div>
                <textarea id="text" name="text">Text</textarea>
            </div>
            <button name="edit">Usuń</button>
            <button as={NavLink} to={"/main/ChooseMessage"}>Zapisz</button>

            <p>
                Taki wynik: {this.state.selectedValue}
            </p>
            </body>
        );
    }
}

export default CreateMessage;
