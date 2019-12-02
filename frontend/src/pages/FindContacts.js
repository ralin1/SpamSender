import React, {Component} from 'react';
import { browserHistory } from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";

class FindContacts extends Component {

    render() {
        return (
            <div>
                <label>Tag</label>
                <input placeholder="Wpisz tag"/>
                <button>Szukaj Kontakty</button>
            </div>
        );
    }
}

export default FindContacts;
