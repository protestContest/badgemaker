import React from 'react';
import {Point, polar2cart} from './2d';

export default class Star extends React.Component {
  startArcPoint(cx, cy, radius, centerAngle, spreadAngle) {
    let endAngle = centerAngle - 0.5*spreadAngle;
    let start = new Point(polar2cart({ r: radius, θ: endAngle }))
      .translate(cx, cy).transform();
    return start;
  }

  endArcPoint(cx, cy, radius, centerAngle, spreadAngle) {
    let startAngle = centerAngle + 0.5*spreadAngle;
    let end = new Point(polar2cart({ r: radius, θ: startAngle }))
      .translate(cx, cy).transform();
    return end;
  }

  describeArc(x, y, radius, centerAngle, spreadAngle, direction) {
    let startAngle = centerAngle + 0.5*spreadAngle;
    let endAngle = centerAngle - 0.5*spreadAngle;

    let end = new Point(polar2cart({ r: radius, θ: startAngle }))
      .translate(x, y).transform();
    let start = new Point(polar2cart({ r: radius, θ: endAngle }))
      .translate(x, y).transform();

    let arcSize = Math.abs(endAngle - startAngle) % (2*Math.PI);
    let largeArcFlag = arcSize <= Math.PI ? "0" : "1";

    let d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, direction, end.x, end.y
    ];

    return d;
  }

  render() {
    let numArms = 5;
    let outerRadius = this.props.size;
    let innerRadius = this.props.size / 2;
    let angle = Math.PI / numArms;
    let coords = [];

    for (let i = 0; i < 2*numArms; i++) {
      let r = (i % 2 === 0) ? outerRadius : innerRadius;
      let p = new Point(polar2cart({ r, θ: i*angle }))
        .rotate(-0.5*angle).translate(this.props.cx, this.props.cy).transform();
      coords = [...coords, p.x, p.y];
    }

    let points = coords.join(',');

    return <polygon points={points} stroke='none' fill={this.props.color} />
  }
}
