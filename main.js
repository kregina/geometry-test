import { relativePositionFrom } from "./user-interaction.js";
import { createCircle, createPolygon, paralelogramPointsFrom, paralelogramCenter } from "./svg-shapes.js";

let interactions = [];

const svg = document.getElementById('canvas');
svg.addEventListener('click', clickHandler);

function clickHandler(event) {
  const position = relativePositionFrom(event, svg);
  interactions.push(position);

  if(interactions.length === 3) {
    const trianglePoints = interactions;
    const paralelogramPoints = paralelogramPointsFrom(trianglePoints)

    const polygon = createPolygon(paralelogramPoints);
    svg.appendChild(polygon);

    const center = paralelogramCenter(paralelogramPoints);

    const [a, b, c] =  trianglePoints;
    const area = a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)
    const ratio = Math.sqrt(area / 3.14);
    
    const paralelogramCircle = createCircle(center.x, center.y, ratio, 'yellow');

    svg.appendChild(paralelogramCircle);    
  }

  if(interactions.length > 3) {
    return;
  }

  const circle = createCircle(position.x, position.y, 11, 'red');
  svg.appendChild(circle);
  
}
