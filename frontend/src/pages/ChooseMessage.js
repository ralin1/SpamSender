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
    // {
    //     id: '3 - Kramer',
    //     name: 'Kramer'
    // },
    // {
    //     id: '4 - George',
    //     name: 'George'
    // },
];

class ChooseMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 'Nothing selected',
            tag: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }


    componentDidMount() {
        window.addEventListener('load', this.handleLoad)
    }

    handleLoad() {
       fetch(url, {
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

    onClick(e) {
        fetch('http://127.0.0.1:8000/send_message/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(this.state),
            headers: {
                Accept: 'application/json'
            }
        })
            // .then(response => response.json())
            // // .then(json => arrayOfData.push({id: 'Tylko testuje mozliwosci listy', name: json[1]}));
            // .then(function (json) {
            //     console.log(json["name"], json["text"])
            //     for (let i = 0; i < json["name"].length; i++) {
            //         console.log(json["name"][i]);
            //         console.log(json["text"][i]["text"]);
            //         arrayOfData.push({id: json["text"][i]["text"], name: json["name"][i]})
            //     }
            // });
            .then(function (response) {
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

    handleSelectChange = (selectedValue) => {
        this.setState({
            selectedValue: selectedValue
        });
    }

    render() {
        return (
            <body className="textForm">
            <div>
                <label className="margin">TAG:</label>
            </div>
            <div>
                <input className="tag" placeholder="Wpisz tag" name="tag" value={this.state.tag} onChange={this.handleChange}/>
            </div>
            <div>
                <label className="margin" for="text">Wybierz szablon:</label>
            </div>
            <DynamicSelect arrayOfData={arrayOfData} onSelectChange={this.handleSelectChange}/> <br/><br/>

            {/*<div>*/}
            {/*    <textarea id="text" name="text">Text</textarea>*/}
            {/*</div>*/}
            <button className="FormField__Button mr-20" for="text" onClickCapture={this.onClick}>Wyślij</button>


            <div className="margin">
                Taki wynik: {this.state.selectedValue}
            </div>
            </body>
        );
    }
}

export default ChooseMessage;
