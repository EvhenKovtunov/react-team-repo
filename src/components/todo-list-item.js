import React, {Component} from 'react';

import './todo-list-item.css';
export  default class TodoListItem extends Component {

    state ={
            done: this.props.done,
            important: this.props.important
    };
    onButtonClick = () => {
        this.props.onClickImportant();
        this.setState(this.setState((state)=>{
            return{
                important: !state.important
            };
        }))
    };
    onLabelClick = () => {
        this.props.onClickDone();
        this.setState((state)=>{
            return{
                done: !state.done
            };
        })
    };

    render() {
        const { label } = this.props;
        const { done,important} = this.state;

        let classNames = 'todo-list-item';

        if(done){
            classNames += ' done';
        }

        if(important){
            classNames += ' important';
        }


        return (
            <span className={classNames}>
      <span
          className="todo-list-item-label"
          onClick= {this.onLabelClick}>
          {label}
      </span>

      <button type="button"
              onClick = {this.onButtonClick}

              className="btn btn-outline-success btn-sm float-right">
        <i className="fa fa-exclamation"  />
      </button>

      <button type="button"
              onClick={this.props.onClickDeleted}
              className="btn btn-outline-danger btn-sm float-right">
        <i className="fa fa-trash-o" />
      </button>
    </span>
        );
    }
}

