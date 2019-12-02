import React, {Component} from 'react';
import {browserHistory} from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";
import '../css/CreateMessage.css'

class CreateMessage extends Component {

    render() {
        return (
            <div className="text_form">
                <React.Fragment>
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-primary">
                            <p>Nazwa szablonu:</p>
                            <p>Text:</p>
                        </li>
                        <li class="list-group-item list-group-item-primary">List item 2</li>
                        <li class="list-group-item list-group-item-primary">List item 3</li>
                    </ul>
                </React.Fragment>
                <button name="edit">Edytuj szablon</button>
                <button name="edit">Usuń szablon</button>
                <button as={NavLink} to={"/main/ChooseMessage"}>Nowy szablon</button>


            </div>
        );
    }
}

export default CreateMessage;
