import React from 'react';
import { connect } from 'react-redux';
import { addSave } from './actions';

class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save() {
    let that = this;

    let svg = document.querySelector('#badge');
    svg.setAttribute('width', 64);
    svg.setAttribute('height', 64);

    let data = (new XMLSerializer()).serializeToString(svg);

    const save = {
      data: that.props.badgeData,
      preview: 'data:image/svg+xml,' + encodeURIComponent(data)
    };

    that.props.saveBadge(save);

    svg.removeAttribute('width');
    svg.removeAttribute('height');
  }

  render() {
    const className = (this.props.canSave) ? 'SaveButton' : 'SaveButton -disabled';
    return (
        <button className={className} onClick={this.save}>
          <div className='icon'>+</div>
          <div className='label'>Save</div>
        </button>
    );
  }
}

const mapStateToProps = (state) => ({
  badgeData: state.badge,
  canSave: state.canSave
});

const mapDispatchToProps = (dispatch) => ({
  saveBadge: (saveData) => dispatch(addSave(saveData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
