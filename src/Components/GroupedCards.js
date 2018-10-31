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
