import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import history from './history';

import GameMenu from './Components/GameMenu';
import Content from './Components/Content';

import './styles/styles.scss'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: "Player One",
    }
  }
  render(){
    return(
      <div id="app">
        <p>One day this will be universal for those games that have complicated scoring.
          For now, a smaller, planet-sized chunk of games will have to suffice.
        </p>
        <Router
          basename={"/"}
          history={history}
        >
          <React.Fragment>
            <GameMenu />
            <Content user={this.state.user} />
          </React.Fragment>
        </Router>
      </div>
    )
  }
}
export default App;


/*
  handleDoublePoint = () => {
    let pointsToDouble = this.state.points
    this.setState({
      points: calcDoublePoint(pointsToDouble)
    })
  }

  <label htmlFor="double-point">Double Points</label>
  <input 
    type="checkbox"
    id="double-point" 
    name="double-point" 
    points={this.state.points}
    onChange={this.handleDoublePoint} 
  />
*/