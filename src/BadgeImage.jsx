import React from 'react';
import {Point, polar2cart} from './2d';

export default class BadgeImage extends React.Component {
  render() {
    let badgeOffset = (this.props.useBanner) ? 20 : 0;
    if (this.props.useBanner && !this.props.useTitle) {
      badgeOffset += 15;
    }

    let clipPath = <circle cx={this.props.badgeCircle.cx} cy={this.props.badgeCircle.cy} r={this.props.badgeCircle.r} />;
    if (!this.props.useTitle) {
      clipPath = this.props.border;
    }

    return (
      <g>
        <clipPath id='imageClip'>
          {clipPath}
        </clipPath>
        <image className='BadgeImage'
            x={this.props.badgeCircle.cx - 0.5*this.props.size}
            y={this.props.badgeCircle.cy - badgeOffset - 0.5*this.props.size}
            width={this.props.size}
            height={this.props.size}
            xlinkHref={this.props.image}
            clipPath='url(#imageClip)' />
      </g>
    );
  }
}
