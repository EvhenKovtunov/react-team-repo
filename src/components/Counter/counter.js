import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from '../../actions';
import './counter.css';


class Counter extends Component {

    render() {
        return (
            <div>
                <h2 className='counter'>{this.props.counter}</h2>
                <div className='container-fluid'>
                    <div className="row">
                        <div className='col-sm-12 counter'>

                            <div>
                                <button className="button-iterator" onClick={this.props.inc}>INC</button>
                            </div>
                            <div>
                                <button className="button-iterator" onClick={this.props.dec}>DEC</button>
                            </div>
                            <div>
                                <button className="button-iterator" onClick={this.props.rnd}>RND</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state
    }
};

const mapDispatchToProps = (dispatch) => {
    const {inc, dec, rnd} = bindActionCreators(actions, dispatch);

    return {

        inc,
        dec,
        rnd: () => {
            rnd(10)
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);