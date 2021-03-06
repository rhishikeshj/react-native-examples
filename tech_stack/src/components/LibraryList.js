import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';

import ListItem from './ListItem';

class LibraryList extends Component {
  componentWillMount() {
    const data = this.props.libraries;
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = dataSource.cloneWithRows(data);
  }

  renderRow(library) {
    return <ListItem library={library} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    libraries: state.libraries
  };
};

export default connect(mapStateToProps)(LibraryList);
