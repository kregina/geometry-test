import { namespace } from "./util.js";

export const createText = ([x, y]) => {
    const text = document.createElementNS(namespace, 'text');
    text.setAttributeNS(null, 'x', x);
    text.setAttributeNS(null, 'y', y);
    text.classList.add('text')
    const tspanX = tspan(x - 10, y - 40, `x: ${x.toFixed(2)}`);
    const tspanY = tspan(x - 10, y - 20, `y: ${y.toFixed(2)}`);
    text.appendChild(tspanX);
    text.appendChild(tspanY);

    return text;
}

const tspan = (x, y, value) => {
    const tspan = document.createElementNS(namespace, 'tspan');
    tspan.setAttributeNS(null, 'x', x);
    tspan.setAttributeNS(null, 'y', y);
    tspan.innerHTML = value;

    return tspan;
}