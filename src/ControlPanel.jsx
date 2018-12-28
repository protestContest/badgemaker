import React from 'react';
import { connect } from 'react-redux';
import { setState, reset } from './actions';
import If from './If';
import SlideControl from './SlideControl';
import TextControl from './TextControl';
import ToggleControl from './ToggleControl';
import ImageControl from './ImageControl';
import ColorControl from './ColorControl';
import DownloadButton from './DownloadButton';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.setProp = this.setProp.bind(this);
    this.fileInput = this.fileInput.bind(this);
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

  fileInput(e) {
    let that = this;
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        that.props.set({ image: e.target.result });
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  removeImage(event) {
    this.props.set({ image: null });
    event.preventDefault();
  }

  reset(event) {
    this.props.reset();
    event.preventDefault();
  }

  render() {
    const generalReset = (this.props.state.isReset)
      ? null
      : <div className='reset' onClick={this.reset}>Reset</div>;

    const imageReset = (this.props.state.image)
      ? <a className='reset' onClick={this.removeImage}>Remove</a>
      : null;

    return (
      <div className="ControlPanel">
        {/*
        <SlideControl title='Badge Radius' value={this.props.state.badgeRadius} min='0' max='500' onChange={this.setProp('badgeRadius')} />
        <SlideControl title='Petal Radius' value={this.props.state.petalRadius} min='0' max='50' onChange={this.setProp('petalRadius')} />
        <SlideControl title='Petal Depth' value={parseFloat(this.props.state.petalDepth).toFixed(2)} min='0' max={Math.PI} step="0.01" onChange={this.setProp('petalDepth')} />
        <SlideControl title='Petal Offset' value={this.props.state.petalOffset} min={-this.props.state.petalRadius} max={this.props.state.petalRadius} onChange={this.setProp('petalOffset')} />
        */}
        <div className='fieldset'>
          <div className='legend'>
            General
            {generalReset}
          </div>
          <ToggleControl title='Petal border' value={this.props.state.usePetals} onChange={this.setProp('usePetals')} />
          <ColorControl id='fillColor' title='Background Color' value={this.props.state.fillColor} onChange={this.setProp('fillColor')} />
          <ColorControl id='borderColor' title='Border Color' value={this.props.state.borderColor} onChange={this.setProp('borderColor')} />
        </div>
        <div className='fieldset'>
          <div className='legend'>
            Title Ring
            <div className='reset'>
              <ToggleControl title='' value={this.props.state.useTitleRing} onChange={this.setProp('useTitleRing')} />
            </div>
          </div>
          <If true={this.props.state.useTitleRing}>
            <TextControl title='Title Text' value={this.props.state.titleText} onChange={this.setProp('titleText')} />
            <ColorControl id='titleColor' title='Title Color' value={this.props.state.titleColor} onChange={this.setProp('titleColor')} />
          </If>
        </div>
        <div className='fieldset'>
          <div className='legend'>
            Banner
            <div className='reset'>
              <ToggleControl title='' value={this.props.state.useBanner} onChange={this.setProp('useBanner')} />
            </div>
          </div>
          <If true={this.props.state.useBanner}>
            <TextControl title='Banner Text' value={this.props.state.bannerText} onChange={this.setProp('bannerText')} />
            <ColorControl id='bannerColor' title='Banner Color' value={this.props.state.bannerColor} onChange={this.setProp('bannerColor')} />
          </If>
        </div>
        <div className='fieldset'>
          <div className='legend'>
            Image
            {imageReset}
          </div>
          <If true={this.props.state.image}>
            <SlideControl title='Image Size' value={this.props.state.imageSize} min='0' max='300' showValue={false} onChange={this.setProp('imageSize')} />
          </If>
          <ImageControl title='Image File' value={this.props.state.image} onChange={this.fileInput} />
        </div>

        <DownloadButton size='500'>Save Badge</DownloadButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  set: item => dispatch(setState(item)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
