import { sum, subtract, multiply, divide } from "./vector.js";

export const center = ([p, q, r, s]) => [
  divide(sum(p, r), 2)[0],
  divide(sum(s, q), 2)[1]
];

export const fromTriangle = ([p, q, r]) => {
  const s = sum(p, multiply(subtract(r, q), -1) );
  return [p, q, r, s];
};