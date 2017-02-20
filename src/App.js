import React from 'react';
import './App.css';

import xhr from 'xhr';

import Plot from './Plot.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location : '',
      data: {},
      dates: [],
      temps: [],
      selected: {
        date: '',
        temp: null
      }
    }
  };

  onPlotClick = (data) => {
    console.log('onPlotClick');
    console.log( data);
    if(data.points) {
      this.setState({
        selected: {
          date: data.points[0].x,
          temp: data.points[0].y
        }
      });
    }
  };

  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  fetchData = (evt) => {
    evt.preventDefault();
    var location = encodeURIComponent(this.state.location);
    var urlP = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlS = '&APPID=cd42dcb5b11a2ba9d2468b688095232b&units=metric';
    var url = urlP + location + urlS;
    var self = this;
    
    xhr({
      url: url
    }, function(err, data) {
      var body = JSON.parse(data.body);
      var list = body.list;
      var dates = [];
      var temps = [];
      for(let i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      };

      self.setState({
        data: body,
        dates: dates,
        temps: temps,
        selected: {
          date: '',
          temp: null
        }
      });
    });
  };

  render() {
    var currentTemp = 'not loaded yet';
    if(this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
      console.log(this.state.data.list[0].main.temp);
    }
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label> I want to know the weather for
            <input 
              type="text"
              placeholder={"City, Country"}
              value={this.state.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        {(this.state.data.list) ? (
          <div className="wrapper">
            <p className='temp-wrapper'>
              <span className='temp'>
                {this.state.selected.temp ? this.state.selected.temp: currentTemp}
                </span>
              <span className='temp-symbol'>°C</span>
              <span className='temp-date'>
                {this.state.selected.temp ? this.state.selected.temp: ''}
              </span>
            </p>
            <h2>Forecast</h2>
            <Plot
              xData={this.state.dates}
              yData={this.state.temps}
              type="scatter"
              onPlotClick={this.onPlotClick}
            />
          </div>
        ):null}
      </div>
    )
  };
};

export default App;
