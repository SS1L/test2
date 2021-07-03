const matrix = [
  ['#', '+', '+', '+', '#', '#', '#', '#', '#'],
  ['#', '+', '#', '+', '#', '+', '+', '+', '#'],
  ['#', '+', '#', '+', '+', '+', '#', '#', '#'],
  ['+', '+', '#', '#', '0', '+', '#', '+', '#'],
  ['#', '#', '#', '+', '+', '#', '#', '#', '#'],
  ['#', '#', '+', '+', '+', '#', '#', '#', '#'],
  ['#', '#', '+', '#', '+', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

const row = matrix.findIndex((r) => r.includes('0'));
const column = matrix[row].indexOf('0');
const start = [row, column];
const end = [3, 0];

if (end[1] === 0) {
  end[1] -= 1;
} else if (end[1] === matrix.length) {
  end[1] += 1;
} else if (end[0] === 0) {
  end[0] -= 1;
} else if (end[0] === matrix.length - 1) {
  end[0] += 1;
}

function findWay(position, end) {
  const arr = [];
  matrix[position[0]][position[1]] = '-';

  arr.push([position]);

  while (arr.length > 0) {
    const path = arr.shift();
    const pos = path[path.length - 1];
    const direction = [
      [pos[0] - 1, pos[1], { answer: 'top' }],
      [pos[0], pos[1] + 1, { answer: 'right' }],
      [pos[0] + 1, pos[1], { answer: 'bottom' }],
      [pos[0], pos[1] - 1, { answer: 'left' }],
    ];

    for (let i = 0; i < direction.length; i++) {
      if (direction[i][0] === end[0] && direction[i][1] === end[1]) {
        return path.concat([end]);
      }

      if (direction[i][0] < 0 || direction[i][0] >= matrix[0].length
         || direction[i][1] < 0 || direction[i][1] >= matrix[0].length
         || matrix[direction[i][0]][direction[i][1]] !== '+') {
        continue;
      }

      matrix[direction[i][0]][direction[i][1]] = '-';
      arr.push(path.concat([direction[i]]));
    }
  }
}

const path = findWay(start, end);
if (!path) {
  console.log('Ohh I`m stack');
  console.log(matrix);
} else {
  const answer = [];
  path.forEach((index) => {
    if (index[2] !== undefined) {
      answer.push(index[2].answer);
    }
  });
  console.log(answer);
}
