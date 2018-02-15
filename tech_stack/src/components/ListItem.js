import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { library, isExpanded } = this.props;

    if (isExpanded) {
      return (
        <CardSection>
          <Text style={styles.descriptionStyle}>
            {library.description}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    const { id, title } = this.props.library;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    height: 50,
  },
  descriptionStyle: {
    fontSize: 15,
    paddingLeft: 15,
    color: 'red'
  }

};

const mapStateToProps = (state, ownProps) => {
  return {
    isExpanded: state.selectedLibraryId === ownProps.library.id
  };
};

export default connect(mapStateToProps, actions)(ListItem);
