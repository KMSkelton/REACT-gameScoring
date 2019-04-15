import React, { Component } from 'react';

import { calcGroupedPoints } from '../lib/pointCalculations' 
import { flipMultiplierBoolean } from '../lib/flipMultiplierBoolean'
import { handleNameChange } from '../lib/handleNameChange'
import { handleOops } from '../lib/handleOops'
import { handleMultiplierPoints } from '../lib/handleMultiplierPoints'

import {MultiplyBy} from './MultiplyBy'
import { GroupedCards } from './GroupedCards';

class StoneAge extends Component {
  constructor(props) {
    super(props)  
    this.state = {
      user: this.props.user,
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
    this.callFlipMulitpierBoolean = this.callFlipMulitpierBoolean.bind(this)
    this.handleMoreGrouped = this.handleMoreGrouped.bind(this)
    this.handleNonFood = this.handleNonFood.bind(this)
    this.localHandleNameChange = this.localHandleNameChange.bind(this)
    this.localHandleOops = this.localHandleOops.bind(this)
    this.handleMultiplyScore = this.handleMultiplyScore.bind(this)
  }
  
  // let's use functional setState
  localHandleNameChange = (e) => {
    this.setState(handleNameChange(e))
  }

  localHandleOops = function(idx) {
    this.setState(handleOops(idx, this.state.points))
    this.handleDisplayScore()
  }

  callFlipMulitpierBoolean = (data, idx) => {
    let multiplierCopy = [...this.state.multipliers]
    multiplierCopy[idx][2] = flipMultiplierBoolean(data)
    this.setState({
      multipliers: multiplierCopy
    })
  }

  handleMultiplyScore = (idx) => {
    let newPoints = handleMultiplierPoints(idx)
    let multiplierCopy = [...this.state.multipliers]
    if (multiplierCopy[idx][2]){
      this.setState((prevState) => ({
        points: prevState.points + newPoints
      }), () => {
        this.handleDisplayScore()
      })
    } else {
      this.localHandleOops(idx)
    }
    this.callFlipMulitpierBoolean(multiplierCopy[idx][2], idx)
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
    this.setState({
      points: totalPoints
    })
  }

  handleMoreGrouped = () => {
    this.handleGroupedPoints()
    document.getElementById('moreGrouped').checked = false
    let currentState = [...this.state.groupedCards]
    let groupIndex = currentState.length
    let rowToMap = currentState[0]
    let groupedToAdd = []
    rowToMap.map(item => {
      return groupedToAdd.push(`${item}  ${groupIndex}`)
    })
    currentState.push(groupedToAdd)
    this.setState({
      groupedCards: currentState
    })
  }

  handleNonFood = (e) => {
    e.preventDefault()
    if(this.state.nonFoodPoints > 0) {
      this.removeNonFood()
    }
    let nonFoodPoints = parseInt(document.getElementById('nonFood').value)
    this.setState((prevState) => ({
      nonFoodPoints: nonFoodPoints,
      points: prevState.points + nonFoodPoints
    }),() => {
      this.handleDisplayScore()
    })
  }

  removeNonFood = () => {
    let nonFoodPoints = this.state.nonFoodPoints
    this.setState((prevState) => ({
      points: prevState.points - nonFoodPoints,
      nonFoodPoints: 0
    }))
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
    return(
      <React.Fragment>
        <fieldset>
        <form onSubmit = {this.handleFormSubmission}>
          <h3>
          Stone Age Scoring
          </h3>
          <label htmlFor="name">Your Name:</label>
          <input 
            type="text" 
            id="name" 
            onChange={this.localHandleNameChange}
            user={this.props.user} 
            placeholder={this.props.user}
            />
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
        <form>
          <label htmlFor="nonFood">Non-food Resources:</label>
          <input
            type="number"
            id="nonFood"
          />
          <input
            type="submit"
            value="Add Non-food"
            onClick={this.handleNonFood}
          />
        </form>
        </fieldset>
      </React.Fragment>
    )  
  }
}


export default StoneAge;

