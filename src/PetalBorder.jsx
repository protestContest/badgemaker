import React from 'react';
import {polar2cart, dist, Point} from '2d';

export default class PetalBorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arcs: [],
      circs: []
    };

    for (let i = 0; i < props.numPetals; i++) {
      let angle = -(i/props.numPetals)*2*Math.PI;
      let ptCenter = polar2cart({r: props.badgeCircle.r - props.petalOffset, θ: angle});

      let p = new Point();
      p.rotate(angle);
      p.translate(ptCenter.x, ptCenter.y);
      p.translate(props.badgeCircle.cx, props.badgeCircle.cy);
      let q = p.transform();

      if (i === 0) {
        this.state.arcs.push(this.beginPath(q.x, q.y, props.petalRadius, angle, props.petalDepth));
      }

      this.state.arcs.push(this.describeArc(q.x, q.y, props.petalRadius, angle, props.petalDepth, props.badgeCircle));
      this.state.circs.push(this.makeCircle(q.x, q.y, props.petalRadius, i));
    }
  }

  beginPath(x, y, radius, centerAngle, spreadAngle) {
    let startAngle = centerAngle + 0.5*spreadAngle;
    let start = new Point(polar2cart({ r: radius, θ: startAngle }))
      .translate(x, y).transform();
    return ["M", start.x, start.y];
  }

  makeCircle(x, y, r, i) {
    return <circle key={i} cx={x} cy={y} r={r} fill='none' stroke='#ddd' />;
  }

  describeArc(x, y, radius, centerAngle, spreadAngle, badgeCircle) {
    let startAngle = centerAngle + 0.5*spreadAngle;
    let endAngle = centerAngle - 0.5*spreadAngle;

    let start = new Point(polar2cart({ r: radius, θ: startAngle }))
      .translate(x, y).transform();
    let end = new Point(polar2cart({ r: radius, θ: endAngle }))
      .translate(x, y).transform();

    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    let d = [
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ];

    return d;
  }

  render() {
    let moves = this.state.arcs.reduce((arcList, arc) => [...arcList, ...arc], []);
    moves.push('Z');
    let d = moves.join(" ");

    return <path stroke={this.props.borderColor} fill={this.props.fillColor} fillRule='evenodd' strokeWidth='3' d={d} />;
  }
}
