import { calcMultiplyScore } from '../lib/pointCalculations' 


export const handleMultiplierPoints = (idx) => {
  let multipliedPoints = calcMultiplyScore(document.getElementsByClassName('mult-a')[idx].value, document.getElementsByClassName('mult-b')[idx].value)
  if (isNaN(multipliedPoints)) {
  multipliedPoints = 0
  }
  return multipliedPoints
}
