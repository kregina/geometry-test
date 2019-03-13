import * as Svg from "./svg/index.js";
import * as Paralelogram from "./geometry/paralelogram.js";
import * as Triangle from './geometry/triangle.js';
import * as Circle from './geometry/circle.js';

let interactions = [];

const canvas = document.getElementById('canvas');
canvas.addEventListener('click', clickHandler);
const areaParalelogramDiv = document.getElementById('area-paralelogram');
const areaCircleDiv = document.getElementById('area-circle');
const canvasInfo = document.getElementById('canvas-info');
const resetButton = document.getElementById('reset-button');
const circleMove = document.getElementById('mousemove');
const circleMoveCoordinates = document.getElementById('coordinates-mousemove');
const circleMoveCoordinateX = document.getElementById('x');
const circleMoveCoordinateY = document.getElementById('y');

resetButton.onclick = _ => {
  interactions = [];
  canvas.innerHTML = '';
  canvasInfo.style.setProperty('--display-canvas-info', 'none');
}

document.addEventListener('mousemove', (event) => {
  const [x, y] = Svg.relativePositionFrom(circleMove, event);

  circleMove.setAttributeNS(null, 'cx', x);
  circleMove.setAttributeNS(null, 'cy', y);

  circleMoveCoordinates.setAttributeNS(null, 'x', x);
  circleMoveCoordinates.setAttributeNS(null, 'y', y);

  circleMoveCoordinateX.setAttributeNS(null, 'x', x - 10);
  circleMoveCoordinateX.setAttributeNS(null, 'y', y - 40);
  circleMoveCoordinateX.innerHTML = `x: ${x.toFixed(2)}`;

  circleMoveCoordinateY.setAttributeNS(null, 'x', x - 10);
  circleMoveCoordinateY.setAttributeNS(null, 'y', y - 20);
  circleMoveCoordinateY.innerHTML = `y: ${y.toFixed(2)}`;
});

function clickHandler(event) {
  const position = Svg.relativePositionFrom(canvas, event);
  interactions.push(position);

  if(interactions.length === 3) {
    const trianglePoints = interactions;
    const paralelogramPoints = Paralelogram.fromTriangle(trianglePoints)

    const polygon = Svg.polygon(paralelogramPoints);
    canvas.appendChild(polygon);

    const center = Paralelogram.center(paralelogramPoints);

    const triangleArea = Triangle.area(trianglePoints);
    const paralelogramArea = triangleArea * 2;
    const ratio = Circle.ratio(paralelogramArea);

    const paralelogramCircle = Svg.circle(center, ratio, '#FFC107');

    areaParalelogramDiv.innerHTML = `Paralelogram Area: ${paralelogramArea.toFixed(2)}`;
    areaCircleDiv.innerHTML = `Yellow Circle Area: ${paralelogramArea.toFixed(2)}`;
    canvasInfo.style.setProperty('--display-canvas-info', 'flex');

    canvas.appendChild(paralelogramCircle);
  }

  if(interactions.length > 3) {
    return;
  }

  const circle = Svg.circle(position, 11, '#D50000');
  const coordinatesCircle = Svg.createText(position);
  canvas.appendChild(circle);
  canvas.appendChild(coordinatesCircle);
}
