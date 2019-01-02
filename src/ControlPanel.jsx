import React from 'react';
import { connect } from 'react-redux';
import { setBadgeProps, reset } from './actions';
import If from './If';
import SlideControl from './SlideControl';
import TextControl from './TextControl';
import ToggleControl from './ToggleControl';
import ImageControl from './ImageControl';
import ColorControl from './ColorControl';
import DownloadButton from './DownloadButton';
import SaveButton from './SaveButton';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.setProp = this.setProp.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.reset = this.reset.bind(this);
  }

  setProp(name) {
    let f = event => {
      let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

      let prop = {};
      prop[name] = value;
      this.props.set(prop);
    };

    f = f.bind(this);
    return f;
  }

  onImageChange(imageProps) {
    this.props.set({
      ...imageProps,
      imagePosition: { x: 0, y: 0 },
      imageSize: 100
    });
  }

  removeImage(event) {
    this.props.set({
      image: null,
      imagePosition: { x: 0, y: 0 },
      imageSize: 100
    });
    event.preventDefault();
  }

  reset(event) {
    this.props.reset();
    event.preventDefault();
  }

  render() {
    const generalReset = (this.props.isReset)
      ? null
      : <div className='reset' onClick={this.reset}>Reset</div>;

    const imageReset = (this.props.badge.image)
      ? <a className='reset' onClick={this.removeImage}>Remove</a>
      : null;

    return (
      <div className="ControlPanel">
        {/*
        <SlideControl title='Badge Radius' value={this.props.badge.badgeRadius} min='0' max='500' onChange={this.setProp('badgeRadius')} />
        <SlideControl title='Petal Radius' value={this.props.badge.petalRadius} min='0' max='50' onChange={this.setProp('petalRadius')} />
        <SlideControl title='Petal Depth' value={parseFloat(this.props.badge.petalDepth).toFixed(2)} min='0' max={Math.PI} step="0.01" onChange={this.setProp('petalDepth')} />
        <SlideControl title='Petal Offset' value={this.props.badge.petalOffset} min={-this.props.badge.petalRadius} max={this.props.badge.petalRadius} onChange={this.setProp('petalOffset')} />
        */}
        <div className='fieldset'>
          <div className='legend'>
            General
            {generalReset}
          </div>
          <ToggleControl title='Petal border' value={this.props.badge.usePetals} onChange={this.setProp('usePetals')} />
          <ColorControl id='fillColor' title='Background Color' value={this.props.badge.fillColor} onChange={this.setProp('fillColor')} />
          <ColorControl id='borderColor' title='Border Color' value={this.props.badge.borderColor} onChange={this.setProp('borderColor')} />
        </div>
        <div className='fieldset'>
          <div className='legend'>
            Title Ring
            <div className='reset'>
              <ToggleControl title='' value={this.props.badge.useTitleRing} onChange={this.setProp('useTitleRing')} />
            </div>
          </div>
          <If true={this.props.badge.useTitleRing}>
            <TextControl title='Title Text' value={this.props.badge.titleText} onChange={this.setProp('titleText')} />
            <ColorControl id='titleColor' title='Title Color' value={this.props.badge.titleColor} onChange={this.setProp('titleColor')} />
          </If>
        </div>
        <div className='fieldset'>
          <div className='legend'>
            Banner
            <div className='reset'>
              <ToggleControl title='' value={this.props.badge.useBanner} onChange={this.setProp('useBanner')} />
            </div>
          </div>
          <If true={this.props.badge.useBanner}>
            <TextControl title='Banner Text' value={this.props.badge.bannerText} onChange={this.setProp('bannerText')} />
            <ColorControl id='bannerColor' title='Banner Color' value={this.props.badge.bannerColor} onChange={this.setProp('bannerColor')} />
          </If>
        </div>
        <div className='fieldset'>
          <div className='legend'>
            Image
            {imageReset}
          </div>
          <ImageControl title='Image File' value={this.props.badge.image} onChange={this.onImageChange} />
          <If true={this.props.badge.image}>
            <SlideControl title='Image Size' value={this.props.badge.imageSize} min='0' max='300' showValue={false} onChange={this.setProp('imageSize')} />
          </If>
        </div>

        <div className='actions'>
          <DownloadButton badge={this.props.badge} size='500'>Download</DownloadButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isReset: state.isReset,
  badge: state.badge
});

const mapDispatchToProps = dispatch => ({
  set: item => dispatch(setBadgeProps(item)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
