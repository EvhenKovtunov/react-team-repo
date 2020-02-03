import {createStore, bindActionCreators} from "redux";
import reducer from "./reducer";
import {inc, dec, rnd} from "./actions";
import React from "react";
import ReactDom from "react-dom";
import {Provider} from 'react-redux';
import App from './components/app';
import Counter from "./components/Counter/counter";

const store = createStore(reducer);

ReactDom.render(
    <Provider store={store}>
            <App/>
    </Provider>
    , document.getElementById("root"));



