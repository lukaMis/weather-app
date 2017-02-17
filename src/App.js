import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location : ''
    }
  };

  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  fetchData = (evt) => {
    evt.preventDefault();
    console.log('fetch data for', this.state.location);
  };

  render() {
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
      </div>  
    )
  };
};

export default App;
