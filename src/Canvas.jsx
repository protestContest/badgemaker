import React from 'react';
import { connect } from 'react-redux';
import PetalBorder from './PetalBorder';
import TitleRing from './TitleRing';
import Banner from './Banner';
import BannerEnd from './BannerEnd';
import BadgeImage from './BadgeImage';
import GothamFont from './GothamFont';

class Canvas extends React.Component {
  render() {
    let center = { x: this.props.width/2, y: this.props.height/2 };

    let badgeCircle = {
      cx: this.props.width/2,
      cy: this.props.height/2,
      r: this.props.badgeRadius
    };

    let border = null;
    let background = null;
    if (this.props.usePetals) {
      border = <PetalBorder
          badgeCircle={badgeCircle}
          numPetals={this.props.numPetals}
          petalOffset={this.props.petalOffset}
          petalDepth={this.props.petalDepth}
          petalRadius={this.props.petalRadius}
          borderColor={this.props.borderColor}
          fillColor='none' />;
      background = <PetalBorder
          badgeCircle={badgeCircle}
          numPetals={this.props.numPetals}
          petalOffset={this.props.petalOffset}
          petalDepth={this.props.petalDepth}
          petalRadius={this.props.petalRadius}
          borderColor='none'
          fillColor={this.props.fillColor} />;
    } else {
      border = <circle cx={badgeCircle.cx} cy={badgeCircle.cy} r={badgeCircle.r + 20} fill='none' stroke={this.props.borderColor} strokeWidth='3' />
      background = <circle cx={badgeCircle.cx} cy={badgeCircle.cy} r={badgeCircle.r + 20} fill={this.props.fillColor} stroke='none' strokeWidth='3' />
    }

    let image = (this.props.image)
      ? <BadgeImage image={this.props.image} size={this.props.imageSize} badgeCircle={badgeCircle} useBanner={this.props.useBanner} useTitle={this.props.useTitleRing} border={border} />
      : null;

    let title = (this.props.useTitleRing)
      ? <TitleRing text={this.props.titleText} badgeCircle={badgeCircle} width={this.props.titleWidth} bgColor={this.props.titleColor} textColor='white' />
      : null;

    let banner = (this.props.useBanner)
      ? <Banner text={this.props.bannerText} badgeCircle={badgeCircle} width={this.props.titleWidth} bgColor={this.props.bannerColor} textColor='white' />
      : null;

    let bannerEnds = (this.props.useBanner)
      ? <BannerEnd badgeCircle={badgeCircle} width={this.props.titleWidth} bgColor={this.props.bannerColor} />
      : null;

    return (
      <div className="Canvas">
        <svg id="badge"
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1">

          <GothamFont />

          {bannerEnds}
          <circle cx={center.x} cy={center.y} r={this.props.badgeRadius} fill="none" stroke="#ddd" strokeWidth="1" />
          {background}
          {image}
          {border}
          {title}
          {banner}

        </svg>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

export default connect(mapStateToProps)(Canvas);
