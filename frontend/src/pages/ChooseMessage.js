import React, {Component} from 'react';
import {browserHistory} from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";

import '../css/ChooseMessage.css'

class ChooseMessage extends Component {
    render() {
        return (
            <div className="text_form">
                <textarea rows="6" cols="70" placeholder="Pisz..."></textarea>
                <button>Zapisz</button>
            </div>
        );
    }
}

export default ChooseMessage;
