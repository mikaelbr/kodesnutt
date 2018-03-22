console.log(data());

const svgNS = 'http://www.w3.org/2000/svg';
const createElementSVG = document.createElementNS.bind(document, svgNS);
const svgEl = createElementSVG('svg');
document.body.appendChild(svgEl);

svgEl.style.background = '#333';
svgEl.style.height = `${window.innerHeight}px`;
svgEl.style.width = `${window.innerWidth}px`;
svgEl.style.display = `block`;
document.body.style.margin = 0;
document.body.style.padding = 0;
svgEl.setAttribute('viewBox', '-25 -25 50 50');

function createAxis(x1, y1, x2, y2) {
  const axis = createElementSVG('line');
  axis.setAttribute('x1', x1);
  axis.setAttribute('y1', y1);
  axis.setAttribute('x2', x2);
  axis.setAttribute('y2', y2);
  axis.setAttribute('stroke', 'white');
  return axis;
}

const xAxis = createAxis(-25, 0, 25, 0);
const yAxis = createAxis(0, -25, 0, 25);

svgEl.appendChild(xAxis);
svgEl.appendChild(yAxis);

let elements = data()
  .map(({ x, y }) => ({ x: x * 2.0, y: y * 2.0 }))
  .map(function(d, i, list) {
    let line = null;
    if (i > 0) {
      line = createAxis(list[i - 1].x, list[i - 1].y, d.x, d.y);
    }
    const circle = createElementSVG('circle');
    circle.setAttribute('cx', d.x);
    circle.setAttribute('cy', d.y);
    circle.setAttribute('r', 0.5);
    circle.setAttribute('fill', 'red');

    return { circle, line };
  });

elements.forEach(({ line }) => {
  if (line) svgEl.appendChild(line);
});
elements.forEach(({ circle }) => {
  svgEl.appendChild(circle);
});

function data() {
  return [
    {
      x: -10,
      y: -7
    },
    {
      x: -9,
      y: -5
    },
    {
      x: -9,
      y: 9
    },
    {
      x: -8,
      y: -4
    },
    {
      x: -8,
      y: 7
    },
    {
      x: -8,
      y: -10
    },
    {
      x: -8,
      y: 9
    },
    {
      x: -2,
      y: -8
    },
    {
      x: -1,
      y: -2
    },
    {
      x: -1,
      y: -10
    },
    {
      x: 0,
      y: -10
    },
    {
      x: 1,
      y: -7
    },
    {
      x: 2,
      y: -1
    },
    {
      x: 2,
      y: 3
    },
    {
      x: 3,
      y: -2
    },
    {
      x: 4,
      y: 7
    },
    {
      x: 4,
      y: 10
    },
    {
      x: 4,
      y: -7
    },
    {
      x: 5,
      y: -4
    },
    {
      x: 6,
      y: 6
    },
    {
      x: 7,
      y: 10
    },
    {
      x: 8,
      y: -10
    },
    {
      x: 8,
      y: 2
    },
    {
      x: 9,
      y: -5
    },
    {
      x: 10,
      y: -6
    }
  ];
}
