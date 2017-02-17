import React from 'react';
import './App.css';

import xhr from 'xhr'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location : '',
      data: {}
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
      self.setState({
        data: JSON.parse(data.body)
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
        <p className='temp-wrapper'>
          <span className='temp'>{currentTemp}</span>
          <span className='temp-symbol'>°C</span>
        </p>
      </div>  
    )
  };
};

export default App;
