import React from 'react';
import {Point, polar2cart} from './2d';

export default class BannerEnd extends React.Component {
  static defaultProps = {
    bannerWidth: 0.215
  };

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

    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    let d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, direction, end.x, end.y
    ];

    return d;
  }

  bannerEnd(r, side) {
    let offset = 4.6*r;
    let arcPosition = (side === 'left') ? -0.60 : -0.4;
    let arcLength =  0.07;
    let arcRadius = r*4;

    let topArc = this.describeArc(this.props.badgeCircle.cx, this.props.badgeCircle.cy + offset, arcRadius, arcPosition*Math.PI, arcLength*Math.PI, 1);
    let topArcStart = this.startArcPoint(this.props.badgeCircle.cx, this.props.badgeCircle.cy + offset, arcRadius, arcPosition*Math.PI, arcLength*Math.PI);
    let topArcEnd = this.endArcPoint(this.props.badgeCircle.cx, this.props.badgeCircle.cy + offset, arcRadius, arcPosition*Math.PI, arcLength*Math.PI);

    let bottomArcRadius = arcRadius - 40;
    let bottomArcStart = this.startArcPoint(this.props.badgeCircle.cx, this.props.badgeCircle.cy + offset, bottomArcRadius, arcPosition*Math.PI, arcLength*Math.PI);
    let bottomArcEnd = this.endArcPoint(this.props.badgeCircle.cx, this.props.badgeCircle.cy + offset, bottomArcRadius, arcPosition*Math.PI, arcLength*Math.PI);
    let bottomArc = [
      'A', bottomArcRadius, bottomArcRadius, 0, '0', 0, bottomArcStart.x, bottomArcStart.y
    ];

    let insetPointRadius = arcRadius - 20;
    let insetPointPosition = (side === 'left') ? arcPosition + 0.02 : arcPosition - 0.02;
    let insetPoint = (side === 'left')
      ? this.startArcPoint(this.props.badgeCircle.cx, this.props.badgeCircle.cy + offset, insetPointRadius, insetPointPosition*Math.PI, arcLength*Math.PI)
      : this.endArcPoint(this.props.badgeCircle.cx, this.props.badgeCircle.cy + offset, insetPointRadius, insetPointPosition*Math.PI, arcLength*Math.PI);

    let bannerCorner = (side === 'left')
      ? this.startArcPoint(this.props.badgeCircle.cx, this.props.badgeCircle.cy + 4.7*r, arcRadius-12, -Math.PI/2, this.props.bannerWidth*Math.PI)
      : this.endArcPoint(this.props.badgeCircle.cx, this.props.badgeCircle.cy + 4.7*r, arcRadius-12, -Math.PI/2, this.props.bannerWidth*Math.PI);

    let d = (side === 'left')
      ? [
        ...topArc,
        'L', bottomArcEnd.x, bottomArcEnd.y,
        ...bottomArc,
        'L', insetPoint.x, insetPoint.y,
        'Z'
      ].join(' ')
      : [
        ...topArc,
        'L', insetPoint.x, insetPoint.y,
        'L', bottomArcEnd.x, bottomArcEnd.y,
        ...bottomArc,
        'Z'
      ].join(' ');

    let shadow = (side === 'left')
      ? [
        'M', topArcEnd.x, topArcEnd.y,
        'L', bottomArcEnd.x, bottomArcEnd.y,
        'L', bannerCorner.x, bannerCorner.y,
        'Z'
      ].join(' ')
      : [
        'M', topArcStart.x, topArcStart.y,
        'L', bottomArcStart.x, bottomArcStart.y,
        'L', bannerCorner.x, bannerCorner.y,
        'Z'
      ].join(' ');

    let endColor = this.getTintedColor(this.props.bgColor, -10);
    let shadowColor = this.getTintedColor(this.props.bgColor, -30);

    return (
      <g>
        <path fill={endColor} stroke='none' d={d} />
        <path fill={shadowColor} stroke='none' d={shadow} />
      </g>
    );
  }

  // credits: richard maloney 2006
  getTintedColor(color, v) {
      if (color.length >6) { color= color.substring(1,color.length)}
      var rgb = parseInt(color, 16);
      var r = Math.abs(((rgb >> 16) & 0xFF)+v); if (r>255) r=r-(r-255);
      var g = Math.abs(((rgb >> 8) & 0xFF)+v); if (g>255) g=g-(g-255);
      var b = Math.abs((rgb & 0xFF)+v); if (b>255) b=b-(b-255);
      r = Number(r < 0 || isNaN(r)) ? 0 : ((r > 255) ? 255 : r).toString(16);
      if (r.length == 1) r = '0' + r;
      g = Number(g < 0 || isNaN(g)) ? 0 : ((g > 255) ? 255 : g).toString(16);
      if (g.length == 1) g = '0' + g;
      b = Number(b < 0 || isNaN(b)) ? 0 : ((b > 255) ? 255 : b).toString(16);
      if (b.length == 1) b = '0' + b;
      return "#" + r + g + b;
  }

  render() {
    let r = this.props.badgeCircle.r - this.props.width/2;
    let leftEnd = this.bannerEnd(r, 'left');
    let rightEnd = this.bannerEnd(r, 'right');

    return (
      <g>
        {leftEnd}
        {rightEnd}
      </g>
    );
  }
}
