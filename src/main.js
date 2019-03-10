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
    canvasInfo.style.setProperty('--display-canvas-info', 'block');

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
