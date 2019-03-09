 export const subtractPoints = ({x:x1, y:y1}, {x:x2, y:y2}) => ({
   x: x2 - x1,
   y: y2 - y1
 })

 export const sumPoints = ({x:x1, y:y1}, {x:x2, y:y2}) => ({
  x: x2 + x1,
  y: y2 + y1
})

export const multiplyPoint = ({x, y}, factor) => ({
  x: x * factor,
  y: y * factor
})