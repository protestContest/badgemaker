import React from 'react';
import Star from './Star';
import {Point, polar2cart} from './2d';

export default class TitleRing extends React.Component {
  constructor(props) {
    super(props);
    this.textRef = React.createRef();
  }

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

  textArc(r) {
    let d = this.describeArc(this.props.badgeCircle.cx, this.props.badgeCircle.cy, r-6, -Math.PI/2, 1.9*Math.PI, 1).join(' ');
    return <path id='textArc' fill='none' stroke='none' d={d} />;
  }

  bgArc(r) {
    let textLength = this.calculateTextLength(this.props.text);
    let arcLength = textLength / (2.8*r) + 0.03;

    let d = this.describeArc(this.props.badgeCircle.cx, this.props.badgeCircle.cy, r, -Math.PI/2, arcLength*Math.PI, 1).join(' ');
    return <path fill='none' stroke={this.props.bgColor} strokeWidth={this.props.width} d={d} />;
  }

  calculateTextLength(text) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textEl.setAttribute('style', 'font-family: "Gotham Medium"');
    svg.appendChild(textEl);
    document.body.appendChild(svg);

    textEl.textContent = text;
    let textLength = textEl.getComputedTextLength();

    document.body.removeChild(svg);

    return textLength;
  }

  lowerArc(r) {
    let arcStart = this.startArcPoint();
    let arcEnd = this.endArcPoint();

    let d = this.describeArc(this.props.badgeCircle.cx, this.props.badgeCircle.cy, r, -Math.PI/2, 1.9*Math.PI, 1).join(' ');
    return <path id='lowerArc' fill='none' stroke={this.props.textColor} strokeWidth={2} d={d} />;
  }

  render() {
    let r = this.props.badgeCircle.r - this.props.width/2;
    let textArc = this.textArc(r);
    let bgArc = this.bgArc(r);
    let lowerArc = this.lowerArc(r);
    let textEl = (
      <text ref={this.textRef} fill={this.props.textColor}>
        <textPath startOffset="50%" textAnchor="middle" xlinkHref="#textArc">{this.props.text}</textPath>
      </text>
    );

    let star = <Star cx={this.props.badgeCircle.cx} cy={this.props.badgeCircle.cy + r} size={5} color={this.props.textColor} />;

    return (
      <g>
        <circle cx={this.props.badgeCircle.cx} cy={this.props.badgeCircle.cy} r={r} strokeWidth={this.props.width} stroke={this.props.bgColor} fill='none' />
        {lowerArc}
        {bgArc}
        {textArc}
        {textEl}
        {star}
      </g>
    );
  }
}
