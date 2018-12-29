import React from 'react';
import {Point, polar2cart} from './2d';

export default class Banner extends React.Component {
  static defaultProps = {
    bannerWidth: 0.22
  };

  describeArc(x, y, radius, centerAngle, spreadAngle, direction) {
    let startAngle = centerAngle + 0.5*spreadAngle;
    let endAngle = centerAngle - 0.5*spreadAngle;

    let end = new Point(polar2cart({ r: radius, θ: startAngle }))
      .translate(x, y).transform();
    let start = new Point(polar2cart({ r: radius, θ: endAngle }))
      .translate(x, y).transform();

    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    let d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, direction, end.x, end.y
    ];

    return d;
  }

  textArc(r) {
    let d = this.describeArc(this.props.badgeCircle.cx, this.props.badgeCircle.cy + 4.7*r, r*4, -Math.PI/2, this.props.bannerWidth*Math.PI, 1).join(' ');
    return <path id='bannerArc' fill='none' stroke='none' d={d} />;
  }

  bannerArc(r) {
    let d = this.describeArc(this.props.badgeCircle.cx, this.props.badgeCircle.cy + 4.6*r, r*4, -Math.PI/2, this.props.bannerWidth*Math.PI, 1).join(' ');
    return <path fill='none' stroke={this.props.bgColor} strokeWidth={40} d={d} />;
  }

  render() {
    let r = this.props.badgeCircle.r - this.props.width/2;
    let textArc = this.textArc(r);
    let textEl = (
      <text fill={this.props.textColor} fontSize={24}>
        <textPath startOffset="50%" textAnchor="middle" xlinkHref="#bannerArc">{this.props.text}</textPath>
      </text>
    );
    let bannerArc = this.bannerArc(r);

    return (
      <g>
        {bannerArc}
        {textArc}
        {textEl}
      </g>
    );
  }
}
