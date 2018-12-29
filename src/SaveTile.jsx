import React from 'react';
import { connect } from 'react-redux';
import { restoreSave, deleteSave } from './actions';

class SaveTile extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onClick() {
    this.props.restore(this.props.save.data);
  }

  onDelete(event) {
    this.props.delete(this.props.save);
    event.stopPropagation();
  }

  render() {
    return (
      <div className='SaveTile' onClick={this.onClick}>
        <div className='delete' onClick={this.onDelete}>&times;</div>
        <img src={this.props.save.preview} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  restore: (badgeData) => dispatch(restoreSave(badgeData)),
  delete: (saveData) => dispatch(deleteSave(saveData))
});

export default connect(null, mapDispatchToProps)(SaveTile);
