import React, {Component} from 'react';
import {browserHistory} from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";

import '../css/ChooseMessage.css'

import '../App.css';
import DynamicSelect from '../js/DynamicSelect';
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

class ChooseMessage extends Component {
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
            <button className="button" for="text">WyśMislij</button>


            <div>
                Taki wynik: {this.state.selectedValue}
            </div>
            </body>
        );
    }
}

export default ChooseMessage;
