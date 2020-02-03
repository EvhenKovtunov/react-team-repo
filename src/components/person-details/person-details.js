import React, {Component, Fragment} from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import SpinnerAt from "../spinner";

export default class PersonDetails extends Component {

  swApiService = new SwapiService();

  state = {
    person : null,
    loading : true
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.personId != this.props.personId){
      this.updatePerson();
    }
  }

  updatePerson() {

    this.setState({loading : true});

    const {personId} = this.props;

    if (!personId) {
      return;
    }

    this.swApiService
        .getPerson(personId)
        .then((person) => {
          this.setState({
            person,
            loading : false
          })
        })

  }

  render() {

    if(!this.state.person) {
      console.log("some");
      return <span>Select a person from list</span>
    }

    const {loading} = this.state;
    const spinner = loading ? <SpinnerAt/> : null;
    const personPage = !loading ? <PersonView person={this.state.person}/> : null;

    return (
        <div className="person-details card">
          {spinner}
          {personPage}
        </div>
    )
  }
}

const PersonView =({person}) => {

  const {
    id,name,gender,eyeColor,birthYear
  } = person;

  return (
      <React.Fragment>
        <img className="person-image"
             src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
  )
};
