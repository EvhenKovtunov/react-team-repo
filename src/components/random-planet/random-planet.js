import React, { Component } from 'react';

import './random-planet.css';
import SwapiService from "../../services/swapi-service";
import SpinnerAt from "../spinner";

export default class RandomPlanet extends Component {

  state ={
    planet : {},
    loading : true
  };

  componentDidMount(){
    this.interval = setInterval(this.UpdateState,4000)
    this.UpdateState();
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  swapiService = new SwapiService();

  UpdateState = () => {
    const id = Math.floor(Math.random()*25+2);
    const planet = this.swapiService.getPlanet(id);

    planet.then((planet) =>{
      this.setState({
        planet,
        loading : false
      })
    })

  };
  render() {

    const{planet,loading} = this.state;

    const spinner = loading ? <SpinnerAt/> : null;
    const classNames = loading ? "random-planet jumbotron rounded box" : "random-planet jumbotron rounded";
    const content = loading ? null : <PlanetView planet={planet}/>;

    return (
      <div className={classNames}>
        {spinner}
        {content}
      </div>

    );
  }
}
const PlanetView = ({planet}) =>{

  const {id,
    name,
    population,
    rotationPeriod,
    diameter} = planet;

  return(
      <React.Fragment>
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
  )
};