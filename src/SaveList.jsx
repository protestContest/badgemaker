import React from 'react';
import { connect } from 'react-redux';
import SaveTile from './SaveTile';

class SaveList extends React.Component {
  render() {
    const tiles = this.props.saves.map((save, i) => <SaveTile save={save} key={`save-${i}`} />);

    return (
      <div className='SaveList'>
        {tiles}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  saves: state.saves
});

export default connect(mapStateToProps)(SaveList);
