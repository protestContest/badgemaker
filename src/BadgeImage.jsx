import React from 'react';
import { connect } from 'react-redux';
import { adjustImage } from './actions';
import {Point, polar2cart} from './2d';

class BadgeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dragging: false };
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onDragStart(event) {
    event.preventDefault();
  }

  onDragEnd(event) {
    this.setState({ dragging: false });
  }

  onMouseDown(event) {
    this.setState({ dragging: true });
  }

  onMouseMove(event) {
    if (!this.state.dragging) return;

    let newPos = {
      x: this.props.position.x + event.movementX,
      y: this.props.position.y + event.movementY
    };

    this.props.adjust(newPos);
  }

  render() {
    let badgeOffset = (this.props.useBanner) ? 20 : 0;
    if (this.props.useBanner && !this.props.useTitle) {
      badgeOffset += 15;
    }

    let clipPath = <circle cx={this.props.badgeCircle.cx} cy={this.props.badgeCircle.cy} r={this.props.badgeCircle.r} />;
    if (!this.props.useTitle) {
      clipPath = this.props.border;
    }

    const className = (this.state.dragging) ? 'BadgeImage -dragging' : 'BadgeImage';

    return (
      <g>
        <clipPath id='imageClip'>
          {clipPath}
        </clipPath>
        <image className={className}
            onDragStart={this.onDragStart}
            onMouseOut={this.onDragEnd}
            onMouseUp={this.onDragEnd}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            x={this.props.badgeCircle.cx - 0.5*this.props.size + this.props.position.x}
            y={this.props.badgeCircle.cy - badgeOffset - 0.5*this.props.size + this.props.position.y}
            width={this.props.size}
            height={this.props.size}
            xlinkHref={this.props.image}
            clipPath='url(#imageClip)' />
      </g>
    );
  }
}

const mapStateToProps = (state) => ({
  position: state.imagePosition
});

const mapDispatchToProps = (dispatch) => ({
  adjust: (newPos) => dispatch(adjustImage(newPos))
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgeImage);
