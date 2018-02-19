import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class SplashForm extends Component {
  componentWillMount() {
    if (this.props.auth.user) {
      Actions.main();
    } else {
      Actions.auth();
    }
  }
  render() {
    return (
      <View>
        <Text>
          Splash screen
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(SplashForm);
