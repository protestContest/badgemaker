import React from 'react';

export default class DownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.triggerDownload = this.triggerDownload.bind(this);
    this.save = this.save.bind(this);
  }

  triggerDownload(imgURI) {
    let evt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });

    let title = 'badge-' + Date.now() + '.png';
    if (this.props.badge.useTitleRing) {
      title = 'badge-' + this.props.badge.titleText.toLowerCase().replace(/[^0-9a-zA-Z]+/g, '-') + '.png';
    } else if (this.props.badge.useBanner) {
      title = 'badge-' + this.props.badge.bannerText.toLowerCase().replace(/[^0-9a-zA-Z]+/g, '-') + '.png';
    }


    let a = document.createElement('a');
    a.setAttribute('download', title);
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');

    a.dispatchEvent(evt);
  }

  save() {
    let that = this;
    let svg = document.querySelector('#badge');
    svg.setAttribute('width', this.props.size);
    svg.setAttribute('height', this.props.size);
    let canvas = document.createElement('canvas');
    canvas.width = this.props.size;
    canvas.height = this.props.size;
    let ctx = canvas.getContext('2d');
    let data = (new XMLSerializer()).serializeToString(svg);
    let img = new Image();

    img.onload = function () {
      ctx.drawImage(img, 0, 0);

      let imgURI = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');

      that.triggerDownload(imgURI);

      svg.removeAttribute('width');
      svg.removeAttribute('height');
    };

    img.src = 'data:image/svg+xml,' + encodeURIComponent(data);
  }

  render() {
    return (
      <div className='DownloadButton'>
        <button className='big-button' onClick={this.save}>{this.props.children}</button>
      </div>
    );
  }
}
