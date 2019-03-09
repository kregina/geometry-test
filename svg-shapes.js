import { sumPoints, subtractPoints, multiplyPoint } from "./geometry.js";
export const namespace = 'http://www.w3.org/2000/svg';

export const createCircle = (x, y, r, color) => {
  const circle = document.createElementNS(namespace, 'circle');
  circle.setAttributeNS(null, 'cx', x);
  circle.setAttributeNS(null, 'cy', y);
  circle.setAttributeNS(null, 'r', r);
  circle.classList.add('circle');
  circle.style.setProperty('--triangle-color', color);
  return circle;
}

export const paralelogramPointsFrom = (trianglePoints) => {
  const [p, q, r] = trianglePoints;
  const s = sumPoints(p, multiplyPoint(subtractPoints(r, q), -1) );

  return [p, q, r, s];
} 

export const createPolygon = (points) => {
  const paralelogram = document.createElementNS(namespace, 'polygon');
  const pointsString = points
    .map(({x, y}) => `${x},${y}`)
    .join(' ');

  paralelogram.setAttributeNS(null, 'points', pointsString);
  paralelogram.classList.add('polygon');
  
  return paralelogram;
};

export const paralelogramCenter = ([p,q,r,s]) => ({
  x: multiplyPoint(sumPoints(p, r), 0.5).x,
  y: multiplyPoint(sumPoints(s, q), 0.5).y
});