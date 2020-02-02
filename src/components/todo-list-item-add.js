import React, {Component} from 'react';

import './todo-list-item-add.css';
import  './search-panel.css';
export  default class TodoListItemAdd extends Component
{

    state ={
        value: 'value',
        inputvalue : ''
    };
    onLabelChange = (props) =>{
        this.setState(({inputvalue :props.target.value})
        )
    };
    onLabelClean = (props) => {
        props.value = ''
    };
    onSubmit = (props) =>{
        props.preventDefault();
        this.props.onAdd(this.state.inputvalue);
        this.setState(({inputvalue :''}))
    };
     render() {
        return(
            <form className="d-flex search-container" onSubmit={this.onSubmit}>

               <input onChange={this.onLabelChange} id="valuecollector"  value = {this.state.inputvalue} className="form-control search-input "/>
               <button type="button" onClick={()=> {
                     this.props.onAdd(this.state.inputvalue);
                     this.setState(({inputvalue :''}))
                 }}
                                className="btn btn-info">Add</button>
            </form>
        )
     }
}