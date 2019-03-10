import { namespace } from "./util.js";

export const polygon = (points) => {
  const element = document.createElementNS(namespace, 'polygon');
  const pointsString = points
    .map(([x, y]) => `${x},${y}`)
    .join(' ');

  element.setAttributeNS(null, 'points', pointsString);
  element.classList.add('polygon');

  return element;
};
