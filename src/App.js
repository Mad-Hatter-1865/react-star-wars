import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { getAllStarships } from './services/sw-api';
import StarshipPage from './pages/StarshipPage/StarshipPage';

class App extends Component {
  
  state = {
    starships: []
  };

  getStarship = (idx) => {
    return this.state.starships[idx];
  }

  async componentDidMount() {
    const starships = await getAllStarships();
    this.setState({ starships: starships.results });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">STAR WARS STARSHIPS</header>
          <Route exact path='/' render={() => 
            <div>
              {this.state.starships.map((starship, idx) => 
                <Link className="c"
                  to={`/starships/${idx}`}
                  key={starship.name}
                >
                  {starship.name}
                </Link>
              )}
            </div>
          }/>
          <Route path='/starships/:idx' render={(props) => 
            <StarshipPage
              {...props}
              getStarship={this.getStarship}
            />
          }/>
      </div>
    );
  }

}

export default App;