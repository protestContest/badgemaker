import React from 'react';
import { connect } from 'react-redux';
import SaveTile from './SaveTile';
import SaveButton from './SaveButton';

class SaveList extends React.Component {
  render() {
    const tiles = this.props.saves.map((save, i) => <SaveTile save={save} key={`save-${i}`} />);

    const saveButton = (this.props.canSave)
      ? <SaveButton />
      : null;

    return (
      <div className='SaveList'>
        {saveButton}
        {tiles}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  canSave: state.canSave,
  saves: state.saves
});

export default connect(mapStateToProps)(SaveList);
