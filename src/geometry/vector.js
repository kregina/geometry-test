export const sum = ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2];

export const subtract = ([x1, y1], [x2, y2]) => [x2 - x1, y2 - y1];

export const multiply = ([x, y], factor) => [x * factor, y * factor];

export const divide = ([x, y], factor) => [x / factor, y / factor];