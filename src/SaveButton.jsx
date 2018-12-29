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
      data: that.props.appState.badge,
      preview: 'data:image/svg+xml,' + encodeURIComponent(data)
    };

    that.props.saveBadge(save);

    svg.removeAttribute('width');
    svg.removeAttribute('height');
  }

  render() {
    return (
      <div className='SaveButton'>
        <button className='big-button' onClick={this.save}>{this.props.children}</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state
});

const mapDispatchToProps = (dispatch) => ({
  saveBadge: (saveData) => dispatch(addSave(saveData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
