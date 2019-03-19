import { namespace } from "./util.js";

export const group = () => {
  const group = document.createElementNS(namespace, 'g');
  return group;
}
