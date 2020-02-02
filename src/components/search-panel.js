import React,{Component} from 'react';


import './search-panel.css';

export default class SearchPanel extends Component {
  state ={
    inputvalue: ''
  };
  onLabelChange = (props) =>{
    this.setState(({inputvalue :props.target.value}));
    this.props.onSearchFilter(props.target.value)
  };

  render() {
    return (
        <form onSubmit={this.onSubmit}>
          <input type="text"
               onChange={this.onLabelChange}
               value={this.state.inputvalue}
               className="form-control search-input"
               placeholder="type to search" />
        </form>
    );
  }

};


