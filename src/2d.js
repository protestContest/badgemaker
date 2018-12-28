export function polar2cart(coord) {
  let x = coord.r * Math.cos(coord.θ);
  let y = coord.r * Math.sin(coord.θ);
  return {x, y};
}

export function dist(p, q) {
  return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
}

function matMult(A, B) {
  let X = [];

  for (let i = 0; i < A.length; i++) {
    X.push([]);
    for (let j = 0; j < B[0].length; j++) {
      X[i].push(0);
      for (let k = 0; k < B.length; k++) {
        X[i][j] += A[i][k]*B[k][j];
      }
    }
  }

  return X;
}

function point2mat(p) {
  return [[p.x], [p.y], [1]];
}

function mat2point(m) {
  return { x: m[0][0]/m[2][0], y: m[1][0]/m[2][0] };
}

function scale(mat, sx, sy) {
  let scaleMat = identity();
  scaleMat[0][0] = sx;
  scaleMat[1][1] = sy;
  return matMult(scaleMat, mat);
}

function translate(mat, dx, dy) {
  let transMat = identity();
  transMat[0][2] = dx;
  transMat[1][2] = dy;
  return matMult(transMat, mat);
}

function rotate(mat, angle) {
  let rotMat = identity();
  rotMat[0][0] = Math.cos(angle);
  rotMat[0][1] = -Math.sin(angle);
  rotMat[1][0] = Math.sin(angle);
  rotMat[1][1] = Math.cos(angle);
  return matMult(rotMat, mat);
}

function identity() {
  return [[ 1, 0, 0 ],
          [ 0, 1, 0 ],
          [ 0, 0, 1 ]];
}

function transform(mat, p) {
  return mat2point(matMult(mat, point2mat(p)));
}

export class Point {
  constructor(p) {
    if (!p) p = { x: 0, y: 0 };
    this.x = p.x;
    this.y = p.y;
    this.xf = identity();
  }

  scale(sx, sy) {
    let scaleMat = identity();
    scaleMat[0][0] = sx;
    scaleMat[1][1] = sy;
    this.xf = matMult(scaleMat, this.xf);
    return this;
  }

  translate(dx, dy) {
    let transMat = identity();
    transMat[0][2] = dx;
    transMat[1][2] = dy;
    this.xf = matMult(transMat, this.xf);
    return this;
  }

  rotate(angle) {
    let rotMat = identity();
    rotMat[0][0] = Math.cos(angle);
    rotMat[0][1] = -Math.sin(angle);
    rotMat[1][0] = Math.sin(angle);
    rotMat[1][1] = Math.cos(angle);
    this.xf = matMult(rotMat, this.xf);
    return this;
  }

  transform() {
    return new Point(mat2point(matMult(this.xf, point2mat({ x: this.x, y: this.y }))));
  }
}

// let p = {x: 2, y: 3};
// let xf = identity();
// xf = scale(xf, 2, 10);
// xf = translate(xf, 3, 3);

// let x = transform(xf, p);

// console.log(x);

// let P = new Point({x: 2, y: 3});
//  x = P.scale(2, 10).translate(3, 3).transform();
// console.log(x);
