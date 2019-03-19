import * as Svg from "./svg/index.js";
import * as Paralelogram from "./geometry/paralelogram.js";
import * as Triangle from './geometry/triangle.js';
import * as Circle from './geometry/circle.js';

const svg = document.getElementById('canvas');

const svgScreenGroup = document.getElementById('svg-group');
const areaParalelogramDiv = document.getElementById('area-paralelogram');
const areaCircleDiv = document.getElementById('area-circle');
const canvasInfo = document.getElementById('canvas-info');
const resetGameButton = document.getElementById('reset-button');
const circleMove = document.getElementById('mousemove');
const circleMoveCoordinates = document.getElementById('coordinates-mousemove');
const circleMoveCoordinateX = document.getElementById('x');
const circleMoveCoordinateY = document.getElementById('y');
const masked = document.getElementById('masked');
const startGameButton = document.getElementById('start');
const loading = document.getElementById('loading');
const body = document.getElementById('body')

// window.onload = _ => setTimeout(showPage, 2500);

const headerEl = document.querySelector('.header')
const introElement = document.querySelector('.intro')

const toggleStickyHeader = entries => {
  if (!entries[0].isIntersecting) {
    headerEl.classList.add('sticked')
  } else {
    headerEl.classList.remove('sticked')
  }
}

// create the observer
const observer = new window.IntersectionObserver(toggleStickyHeader);
observer.observe(introElement)

let interactions = [];
let selectedElement;
let offset;
let transform;
let svgShapesGroup;

const startGame = _ => {
  masked.classList.remove('mask');
  startGameButton.style.display = 'none';
  svg.style.setProperty('--display', 'flex');
}

const resetGame = _ => {
  masked.classList.add('mask');
  startGameButton.style.display = 'initial';
  svg.style.setProperty('--display', 'none');
  canvasInfo.style.setProperty('--display', 'none');
  interactions = [];
  svgScreenGroup.innerHTML = '';
}

const updateCursor = event => {
  const [x, y] = Svg.relativePositionFrom(svg, event);

  circleMove.setAttributeNS(null, 'cx', x);
  circleMove.setAttributeNS(null, 'cy', y);

  circleMoveCoordinates.setAttributeNS(null, 'x', x);
  circleMoveCoordinates.setAttributeNS(null, 'y', y);

  circleMoveCoordinateX.setAttributeNS(null, 'x', x - 10);
  circleMoveCoordinateX.setAttributeNS(null, 'y', y - 40);
  circleMoveCoordinateX.innerHTML = `x: ${x.toFixed(2)}`;

  circleMoveCoordinateY.setAttributeNS(null, 'x', x - 10);
  circleMoveCoordinateY.setAttributeNS(null, 'y', y - 20);
  circleMoveCoordinateY.innerHTML = `y: ${y.toFixed(2)}`;
}

const showPage = _ => {
  body.classList.remove('preload');
  loading.style.display = 'none';
}

const draw = () => {
  const trianglePoints = interactions;
  const paralelogramPoints = Paralelogram.fromTriangle(trianglePoints)

  const polygon = Svg.polygon(paralelogramPoints);

  const center = Paralelogram.center(paralelogramPoints);

  const triangleArea = Triangle.area(trianglePoints);
  const paralelogramArea = triangleArea * 2;
  const ratio = Circle.ratio(paralelogramArea);

  const paralelogramCircle = Svg.circle(center, ratio, '#FFC107');

  areaParalelogramDiv.innerHTML = `Paralelogram Area: ${paralelogramArea.toFixed(2)}`;
  areaCircleDiv.innerHTML = `Yellow Circle Area: ${paralelogramArea.toFixed(2)}`;
  canvasInfo.style.setProperty('--display', 'flex');

  const fragment = document.createDocumentFragment();
  fragment.appendChild(polygon);
  fragment.appendChild(paralelogramCircle);

  if (!svgShapesGroup) {
    svgShapesGroup = Svg.group();
    svgShapesGroup.appendChild(fragment);
    svgScreenGroup.appendChild(svgShapesGroup);
  }
  else {
    svgShapesGroup.innerHTML = '';
    svgShapesGroup.appendChild(fragment);
  }
}

const clickHandler = event => {
  const position = Svg.relativePositionFrom(svg, event);
  interactions.push(position);

  if(interactions.length > 3) {
    return;
  }

  if(interactions.length === 3) {
    draw();
  }

  const coordinatesCircle = Svg.createText(position);

  const circle = Svg.circle(position, 11, '#D50000', 'transparent');
  circle.classList.add('draggable');
  circle.dataset.index = interactions.length - 1;

  svgScreenGroup.appendChild(coordinatesCircle);
  svgScreenGroup.appendChild(circle);
}

const startDragSelectedElement = event => {
  if (event.target.classList.contains('draggable')) {
    event.preventDefault();
    selectedElement = event.target;
    offset = Svg.relativePositionFrom(svg, event);

    // Make sure the first transform on the element is a translate transform
    let transforms = selectedElement.transform.baseVal;

    if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
      // Create an transform that translates by (0, 0)
      let translate = svg.createSVGTransform();
      translate.setTranslate(0, 0);
      selectedElement.transform.baseVal.insertItemBefore(translate, 0);
    }

    // Get initial translation
    transform = transforms.getItem(0);
    offset[0] -= transform.matrix.e;
    offset[1] -= transform.matrix.f;
  }
}

const dragSelectedElement = evt => {
  if (selectedElement) {
    evt.preventDefault();
    let [x, y] = Svg.relativePositionFrom(svg, evt);
    let [offsetX, offsetY] = offset;
    transform.setTranslate(x - offsetX, y - offsetY);
  }
}

const endDragSelectedElement = evt => {
  if (!selectedElement)
    return;

  interactions[selectedElement.dataset.index] = Svg.relativePositionFrom(svg, evt);

  if (interactions.length >= 3)
    draw();
  selectedElement = null;
}

svg.addEventListener('mousedown', startDragSelectedElement);
svg.addEventListener('mousemove', dragSelectedElement);
svg.addEventListener('mouseup', endDragSelectedElement);
svg.addEventListener('mouseleave', endDragSelectedElement);
svg.addEventListener('touchstart', startDragSelectedElement);
svg.addEventListener('touchmove', dragSelectedElement);
svg.addEventListener('touchend', endDragSelectedElement);
svg.addEventListener('touchleave', endDragSelectedElement);
svg.addEventListener('touchcancel', endDragSelectedElement);

svg.addEventListener('click', clickHandler);
svg.addEventListener('mousemove', updateCursor);

startGameButton.addEventListener('click', startGame);
resetGameButton.addEventListener('click', resetGame);