import React from 'react';

export const MultiplyBy = (props) => {
  let array = props.multipliers
  let btnTxt = ""
  return(
    array.map((item, idx) => {
      if (item[2] === true) {
        btnTxt = "Multiply"
      } else {
        btnTxt = "Oops!"
      }
      return(
        <form key={item[0]+item[1]}>
        <label htmlFor="mult-a">{item[0]}</label>
        <input 
          type="textbox"
          className="mult-a"
          name="mult-a"
        />
        <label htmlFor="mult-b">{item[1]}</label>
        <input 
          type="textbox"
          className="mult-b"
          name="mult-b"
        />  
        <input
          type="button"
          value={btnTxt}
          points={props.points}
          onClick={() => props.handleMultiplyScore(idx)}
        />
      </form>
      )
    })
  )
}
