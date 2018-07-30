import React, { Component } from "react";
// import "./neo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      neoList: [],
      abMag: [],
      today: ""
    };
  }

  componentWillMount() {
    this.setState({ today: this.formatDate(new Date()) });

    fetch(
      "https://api.nasa.gov/neo/rest/v1/feed?start_date=2018-07-28&api_key=v5RFC0BvhWX1dRLupQt3ykxykp0OXc5ULq4OFozA"
    )
      .then(console.log("FETCH!"))
      .then(response => response.json())
      .then(console.log("RESPONSE RECEIVED"))
      .then(results => {
        let resultsArray = [];
        let neos = results.near_earth_objects[this.state.today];
        for (let i in neos) {
          this.state.abMag.push(neos[i].absolute_magnitude_h);
          resultsArray.unshift([
            neos[i].name,
            neos[i].nasa_jpl_url,
            neos[i].estimated_diameter.meters.estimated_diameter_max,
            neos[i].is_potentially_hazardous_asteroid,
            neos[i].close_approach_data[0].miss_distance.kilometers,
            neos[i].absolute_magnitude_h,
            neos[i].close_approach_data[0].orbiting_body
          ]);
        }
        console.log("resultsArray", resultsArray);
        this.setState({ neoList: resultsArray });
      });
  }

  componentDidMount() {
    console.log(
      "%cCOMPONENT MOUNTED",
      "font-family:sans-serif;font-size:20px;color:teal;"
    );
  }

  renderNeos() {
    return (
      <div>
        {this.state.neoList.map(neo => (
          <ul key={neo}>
            <li key={neo[0]}>
              <a key={neo[1]} href="{neo[1]}">
                {neo[0]}
              </a>
            </li>
            <li key={neo[2]}>{neo[2]}</li>
            <li key={neo[4]}>{neo[4]}</li>
            <li key={neo[5]}>{neo[5]}</li>
            <li key={neo[6]}>{neo[6]}</li>
          </ul>
        ))}
      </div>
    );
  }

  displayNumbers(n) {
    let digits = n.toString().split(".");
    let int = digits[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    if (digits[1]) int += "." + digits[1].toString().substring(0, 3);
    return int;
  }

  formatDate(dateObject) {
    let year = dateObject.getFullYear();

    let month = dateObject.getMonth() + 1;
    if (month < 10) month = "0" + month;

    let day = dateObject.getDate();
    if (day < 10) day = "0" + day;

    return year + "-" + month + "-" + day;
  }

  render() {
    console.log("IN RENDER", this.state.neoList);
    return (
      <div>
        <div className="neoList">{this.renderNeos()}</div>
      </div>
    );
  }
}

export default App;
