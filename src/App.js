import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Weather</h1>
        <form>
          <label> I want to know the weather for
            <input type="text" placeholder={"City, Country"} />
          </label>
        </form>
      </div>  
    )
  };
};

export default App;
