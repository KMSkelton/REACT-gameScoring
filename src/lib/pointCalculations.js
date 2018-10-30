export const calcAddPoint = (data) => {
  return data.points + 1
}    

export const calcDoublePoint = (data) => {
  return data * 2
}

export const calcMultiplyScore = (dataA, dataB, idx = 0) => {
  return dataA[idx] * dataB[idx]
}

export const calcGroupedPoints = (data) => {
  return data.length * data.length
}