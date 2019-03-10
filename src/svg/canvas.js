export const relativePositionFrom = (svg, evt) => {
  const CTM = svg.getScreenCTM();
  if (evt.touches) { evt = evt.touches[0]; }
  return [
    (evt.clientX - CTM.e) / CTM.a,
    (evt.clientY - CTM.f) / CTM.d
  ];
}