import ItemList from "../item-list";
import PersonDetails from "../person-details";
import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import {Row} from "../row/row";

export default class StarshipsPage extends Component {

    swapiService = new SwapiService();

    state = {
        id: null
    };

    onPersonSelected = (id) => {
        this.setState({
            personSelectedId: id
        });
        console.log(id);
    };

    render() {
        const {personSelectedId} = this.state;
        const personDetails = (<PersonDetails personId={personSelectedId}/>);
        const itemList = (
            <ItemList getData={() => this.swapiService.getAllStarships()}
                      onItemSelected={this.onPersonSelected}>
                      {(item) => `${item.name}`}
            </ItemList>);
        return (
            <Row left={itemList} right={personDetails}/>
        )
    }
}