import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import ErrorButton from "../error-button";
import PeoplePage from "../people-page";
import StarshipsPage from "../starships-page/starships-page";

export default class App extends Component {

    render() {

        return (
            <div>
                <Header/>
                <RandomPlanet/>
                <div className="container boxing col-sm-12">
                    <ErrorButton/>
                </div>
                <PeoplePage/>
                <StarshipsPage/>
            </div>
        )
    };

};
