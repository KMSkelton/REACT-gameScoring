import React from 'react';
import { GroupedCards } from './GroupedCards';
import { MultiplyBy } from './MultiplyBy'

export const StoneAge = (props) => (
  <fieldset>
  <form onSubmit = {props.handleFormSubmission}>
    <h3>
    Stone Age Scoring
    </h3>
    <label htmlFor="name">Your Name:</label>
    <input 
      type="text" 
      id="name" 
      name="user_name" 
      onChange={props.handleNameChange}/>
    <GroupedCards
    points={props.points}
    groupedCards={props.groupedCards}
    handleGroupedPoints={props.handleGroupedPoints}
    handleMoreGrouped={props.handleMoreGrouped}
    />
    <label htmlFor="moreGrouped">I have more</label>
    <input 
    type="checkbox"
    id="moreGrouped"
    value="moreGrouped"
    onChange={props.handleMoreGrouped}
    />
    <input 
    type="submit"
    value="Calculate Points"
    onClick={props.handleDisplayScore}
    />
  </form>
  <MultiplyBy
    points={props.points}
    multipliers={props.multipliers}
    handleMultiplyScore={props.handleMultiplyScore}
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
      onClick={props.handleNonFood}
    />
  </form>
  </fieldset>
)