/**
 * @param {SVGSVGElement} svg
 * @param {MouseEvent} event
 */
export const relativePositionFrom = (svg, event) => {
  const e = event;
  const point = new DOMPoint(e.clientX, e.clientY);
  const relativePoint = point.matrixTransform(svg.getScreenCTM().inverse())

  return [
    relativePoint.x,
    relativePoint.y
  ];
}