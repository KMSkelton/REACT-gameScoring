import { handleMultiplierPoints } from './handleMultiplierPoints'

export const handleOops = (idx, points) => {
  let removePoints = handleMultiplierPoints(idx)
  return {
    points: points - removePoints
  }
}

