import React, {Component} from 'react';
import {browserHistory} from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";

import '../css/ChooseMessage.css'

import '../App.css';
import DynamicSelect from '../js/DynamicSelect';
//Pobieranie zapisanych szablonów z firebase
const url = 'http://127.0.0.1:8000/get_template/';

var arrayOfData;

class ChooseMessage extends Component {
    constructor(props) {
        //load array from DATABASE
        arrayOfData = [
            {
                id: 'Tylko testuje mozliwosci listy',
                name: 'Jerry'
            },
            {
                id: '2 - Elaine',
                name: 'Elaine'
            },
            // {
            //     id: '3 - Kramer',
            //     name: 'Kramer'
            // },
            // {
            //     id: '4 - George',
            //     name: 'George'
            // },
        ];

        super(props);
        if ((arrayOfData.length) > 0) {
            this.state = {
                selectedValue: arrayOfData[0]['id']
            };
        } else {
            this.state = {
                selectedValue: ''
            };
        }

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
        // .then(json => arrayOfData.push({id: 'Tylko testuje mozliwosci listy', name: json[1]}));
            .then(function (json) {
                console.log(json["name"], json["text"]);
                for (let i = 0; i < json["name"].length; i++) {
                    console.log(json["name"][i]);
                    console.log(json["text"][i]["text"]);
                    arrayOfData.push({id: json["text"][i]["text"], name: json["name"][i]})
                }
            });
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
                <p className="margin">TAG:</p>
            </div>
            <div>
                <input className="tag" placeholder="Wpisz tag"/>
            </div>
            <div>
                <p className="margin" for="text">Wybierz szablon:</p>
            </div>
            <DynamicSelect arrayOfData={arrayOfData} onSelectChange={this.handleSelectChange}/> <br/><br/>

            {/*<div>*/}
            {/*    <textarea id="text" name="text">Text</textarea>*/}
            {/*</div>*/}
            <button className="FormField__Button mr-20" for="text" onClickCapture={this.onClick}>Wyślij</button>


            <div className="margin">
                Podgląd szablonu: {this.state.selectedValue}
            </div>
            </body>
        );
    }
}

export default ChooseMessage;
