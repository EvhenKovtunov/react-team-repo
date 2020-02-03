import React, {Component} from 'react';

import './item-list.css';
import SpinnerAt from "../spinner";

export default class ItemList extends Component {

    state = {
        peopleList: null
    };

    componentDidMount() {
        const getData = this.props.getData;

        getData()
            .then((peopleList) => {
                this.setState({peopleList})
            })
    }

    renderItems = (arr) => {
        return arr.map((item) => {
            const{id} = item;

            const value = this.props.children(item);
            return (

                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {value}
                </li>
            )
        })
    };

    render() {

        const {peopleList} = this.state;

        if (!peopleList) {
            return <SpinnerAt></SpinnerAt>
        }

        const items = this.renderItems(peopleList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
