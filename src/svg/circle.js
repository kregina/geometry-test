import { namespace } from "./util.js";

export const circle = ([x, y], r, color, fill='none') => {
  const circle = document.createElementNS(namespace, 'circle');
  circle.setAttributeNS(null, 'cx', x);
  circle.setAttributeNS(null, 'cy', y);
  circle.setAttributeNS(null, 'r', r);
  circle.setAttributeNS(null, 'fill', fill);
  circle.classList.add('circle');
  circle.style.setProperty('--circle-color', color);

  return circle;
}
