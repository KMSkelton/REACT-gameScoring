import React from 'react';

export const GroupedCards = (props) => {
  let array = props.groupedCards
  return(
    array.map(row => {
      return row.map(item => {
        return(
          <div key={item}>
            <label htmlFor="groupItem">{item}</label>
            <input
            id={item}
            type="checkbox"
            name="groupItem"
            points={props.points}
            onChange={props.handleGroupedPoints}
            />
          </div>
        )
      })
    })
  )
}

/*
  <label htmlFor="one-point">1 Point</label>
  <input 
    type="checkbox" 
    id="one-point" 
    name="one-point" 
    points={this.state.points}
    onChange={this.handleAddPoint}
  />
  <label htmlFor="two-point">1 Point</label>
  <input 
    type="checkbox" 
    id="two-point" 
    name="two-point" 
    points={this.state.points}
    onChange={this.handleAddPoint}
  />
  <label htmlFor="three-point">1 Point</label>
  <input 
    type="checkbox" 
    id="three-point" 
    name="three-point" 
    points={this.state.points}
    onChange={this.handleAddPoint} 
  />
*/