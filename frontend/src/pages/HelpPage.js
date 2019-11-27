import React, {Component} from 'react';
import { browserHistory } from "react-router";
import {Link, NavLink} from 'react-router-dom';
import Logo from "../logo1.png";

class HelpPage extends Component {

    render() {
        return (
            <div>
                <form action="mailto:">
                    <label for="name">Imie:</label>
                    <input type="text" name="name"/>
                    <label for="email">Poczta:</label>
                    <input type="text" name="email"/>
                    <label for="comment">Wiadomość:</label>
                    <input type="text" name="comment" size="50"/>
                    <input type="submit" value="Wyśli"/>
                    <input type="reset" value="Wyczyść"/>
                </form>
            </div>
        );
    }
}

export default HelpPage;
