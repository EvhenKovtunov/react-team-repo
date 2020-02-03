import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";
import './row.css';

export const Row = ({left, right}) => {
    return (
        <div className="row mb2 data-box-container">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    )
};