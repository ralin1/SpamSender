import React, {Component} from 'react';
import {browserHistory} from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";

import '../css/ChooseMessage.css'

class ChooseMessage extends Component {
    render() {
        return (
            <div className="text_form">
                <label for="text">Napisz szablon</label>
                <textarea id="text" name="text" rows="6" cols="33" >Text</textarea>
                <button for="text">Zapisz</button>
            </div>
        );
    }
}

export default ChooseMessage;
