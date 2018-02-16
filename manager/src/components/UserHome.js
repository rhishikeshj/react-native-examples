import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class UserHome extends Component {
  render() {
    return (
      <View>
        <Text>
          {`This is the home screen for user ${this.props.user.name}`}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user
  };
};

export default connect(mapStateToProps, {})(UserHome);
