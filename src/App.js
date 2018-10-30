import React, { Component } from 'react';
import {calcAddPoint, calcDoublePoint, calcMultiplyScore, calcGroupedPoints} from './lib/pointCalculations' 
import {MultiplyBy} from './Components/MultiplyBy'
import {flipFalse} from './lib/flipFalse'
import { GroupedCards } from './Components/GroupedCards';

class App extends Component {
  constructor(props) {
    super(props)  
    this.state = {
      user: "Player One",
      clicked: [[]],
      points: 0,
      multipliers: [
        ['farmers', 'agriculture track', true], 
        ['tool makers', 'tool tiles', true],
        ['builder', 'building tiles', true],
        ['shaman', 'meeples', true]
      ],
      groupedCards: [
        ['Writing', 'Medicine', 'Poetry', 'Art', 'Music']
      ]
    }
    this.handleAddPoint = this.handleAddPoint.bind(this)
    this.handleDoublePoint = this.handleDoublePoint.bind(this)
    this.handleMultiplyScore = this.handleMultiplyScore.bind(this)
    this.callFlipFalse = this.callFlipFalse.bind(this)
    this.handleMoreGrouped = this.handleMoreGrouped.bind(this)
  }

  handleAddPoint = (e) => {
    let pointId = e.target.id
    if (!this.state.clicked.includes(pointId)) {
      this.state.clicked.push(pointId)
      this.setState({
        points: calcAddPoint(this.state)
      })  
    }
  }
  
  handleDoublePoint = () => {
    let pointsToDouble = this.state.points
    this.setState({
      points: calcDoublePoint(pointsToDouble)
    })
  }

  callFlipFalse = (data, idx) => {
    let multiplierCopy = [...this.state.multipliers]
    multiplierCopy[idx][2] = flipFalse(data)
    this.setState((prevState) => ({
      multipliers: multiplierCopy
    }))
  }

  handleMultiplierPoints = (idx) => {
    let multipliedPoints = calcMultiplyScore(document.getElementsByClassName('mult-a')[idx].value, document.getElementsByClassName('mult-b')[idx].value)
    if (isNaN(multipliedPoints)) {
    multipliedPoints = 0
    }
    return multipliedPoints
  }

  handleOops = (idx) => {
    let removePoints = this.handleMultiplierPoints(idx)
    this.setState((prevState) => ({
      points: prevState.points - removePoints,
    }), () => {
      this.handleDisplayScore()
    })
  }

  handleMultiplyScore = (idx) => {
    let newPoints = this.handleMultiplierPoints(idx)
    let multiplierCopy = [...this.state.multipliers]
    if (multiplierCopy[idx][2]){
      this.setState((prevState) => ({
        points: prevState.points + newPoints
      }), () => {
        this.handleDisplayScore()
      })
    } else {
      this.handleOops(idx)
    }
    this.callFlipFalse(multiplierCopy[idx][2], idx)
  }
    
  handleGroupedPoints = (e) => {
    let pointId;
    if (e) {
      pointId = e.target.id
    }
    let currentState = [...this.state.groupedCards]
    let groupIndex = currentState.length - 1
    if (!this.state.clicked[groupIndex]) {
      this.state.clicked.push([])
    }
    console.log("pointId", pointId === undefined)
    if (pointId === undefined) {
      return
    }
    if (!this.state.clicked[groupIndex].includes(pointId)) {
      this.state.clicked[groupIndex].push(pointId)
    } else {
      this.state.clicked[groupIndex].splice(this.state.clicked[groupIndex].indexOf(pointId), 1)
    }
    let rowPoints = this.state.clicked.map( row => {
      return calcGroupedPoints(row)
    })
    let totalPoints = rowPoints.reduce((tot,idx) => tot + idx)
    console.log('what are we sending? :',rowPoints);
    this.setState({
      points: totalPoints
    })
  }

// calcGroupedPoints(this.state.clicked[groupIndex])

  handleMoreGrouped = () => {
    this.handleGroupedPoints()
    document.getElementById('moreGrouped').checked = false
    let currentState = [...this.state.groupedCards]
    let groupIndex = currentState.length
    let rowToMap = currentState[0]
    console.log("row to map: ", rowToMap)
    let groupedToAdd = []
    rowToMap.map(item => {
      return groupedToAdd.push(`${item}  ${groupIndex}`)
    })
    currentState.push(groupedToAdd)
    this.setState({
      groupedCards: currentState
    })
  }
  
  handleDisplayScore = (e) => {
    if (e) {
      e.preventDefault()
    }
    if (document.getElementById('totalDiv')) {
      document.getElementById('totalDiv').remove()
    }
    const targetEl = document.getElementById('app')
    const totalDiv = document.createElement('div')
    totalDiv.setAttribute('id','totalDiv')
    const scoreTxt = document.createTextNode(`${this.state.user} your score is ${this.state.points}`) 
    totalDiv.appendChild(scoreTxt)
    targetEl.appendChild(totalDiv)
  }

  render() {
    return (
      <div id="app">
        <p>One day I hope this will be universal for those games that have complicated scoring.
          For now, a smaller, planet-sized chunk of games will have to suffice.
        </p>
        <fieldset>
          <form onSubmit = {this.handleFormSubmission}>
            <h3>
            Basic Scoring
            </h3>
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="user_name" />
            <GroupedCards
            points={this.state.points}
            groupedCards={this.state.groupedCards}
            handleGroupedPoints={this.handleGroupedPoints}
            handleMoreGrouped={this.handleMoreGrouped}
            />
            <label htmlFor="moreGrouped">I have more</label>
            <input 
            type="checkbox"
            id="moreGrouped"
            value="moreGrouped"
            onChange={this.handleMoreGrouped}
            />
            <input 
            type="submit"
            value="Calculate Points"
            onClick={this.handleDisplayScore}
            />
          </form>
          <MultiplyBy
            points={this.state.points}
            multipliers={this.state.multipliers}
            handleMultiplyScore={this.handleMultiplyScore}
          />
        </fieldset>
      </div>
    );
  }
}

export default App;


/*
  <label htmlFor="double-point">Double Points</label>
  <input 
    type="checkbox"
    id="double-point" 
    name="double-point" 
    points={this.state.points}
    onChange={this.handleDoublePoint} 
  />
*/