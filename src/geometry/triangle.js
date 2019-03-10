export const area = ([[ax, ay], [bx, by], [cx, cy]]) =>
  Math.abs(
    ax * (by - cy) +
    bx * (cy - ay) +
    cx * (ay - by))
  / 2

