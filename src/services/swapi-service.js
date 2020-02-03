export default class SwapiService {

  _apiBase = 'https://swapi.co/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson).slice(0,5);
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet).slice(0,5);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet)
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results;
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`);
  }

  _extractId(item){
    const regex = /([0-9]*)\/$/;
    return item.url.match(regex)[1];
  }

  _transformPlanet = (planet) => {
    return (
        {
          id : this._extractId(planet),
          name : planet.name,
          population : planet.population,
          diameter: planet.diameter,
          rotationPeriod : planet.rotation_period
        }
    )
  };
  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }
}
