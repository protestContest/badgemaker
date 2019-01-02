import React from 'react';
import * as Vibrant from 'node-vibrant';

export default class ImageControl extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.resetFileInput = this.resetFileInput.bind(this);
  }

  onChange(event) {
    let that = this;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        let image = new Image();
        image.onload = () => {
          Vibrant.from(image).quality(0).getPalette().then(palette => {
            let customColors = ['Vibrant', 'DarkVibrant', 'LightVibrant', 'Muted', 'DarkMuted', 'LightMuted']
              .map(prop => palette[prop]).filter(swatch => swatch !== null)
              .map(swatch => swatch.getHex());
            if (customColors.length > 5) {
              customColors = customColors.slice(0, 5);
            }

            that.props.onChange({
              image: e.target.result,
              customColors
            });
          });
        };
        image.src = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  resetFileInput() {
    this.fileInput.current.value = null;
  }

  componentWillReceiveProps(props) {
    if (props.value === null) {
      this.resetFileInput();
    }
  }

  render() {
    const { title, value, onChange, removeImage, ...restProps } = this.props;

    const preview = (this.props.value)
      ? <img className='preview' src={this.props.value} />
      : null;

    return (
      <label className='ImageControl'>
        <div className='input'>
          <div>
            <div className='title'>{this.props.title}</div>
            <input ref={this.fileInput} type='file' {...restProps} onChange={this.onChange} />
          </div>
          {preview}
        </div>
      </label>
    );
  }
}
