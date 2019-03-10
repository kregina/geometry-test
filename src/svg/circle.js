import { namespace } from "./util.js";

export const circle = ([x, y], r, color) => {
  const circle = document.createElementNS(namespace, 'circle');
  circle.setAttributeNS(null, 'cx', x);
  circle.setAttributeNS(null, 'cy', y);
  circle.setAttributeNS(null, 'r', r);
  circle.classList.add('circle');
  circle.style.setProperty('--circle-color', color);

  return circle;
}
