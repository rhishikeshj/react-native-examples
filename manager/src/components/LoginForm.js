import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native';

import {
  Card,
  CardSection,
  Button,
  Spinner,
  TextfieldWithFloatingLabel,
  PasswordInput,
  CodeInputTextfield
} from './common';
import {
  updateEmail,
  updatePassword,
  loginUser,
  socialLoginUser
} from '../actions';

import { strings } from '../utils/i18n';

class LoginForm extends Component {
  componentWillMount() {
    this.spinValue = new Animated.Value(0);
    this.marginValue = new Animated.Value(0);

    this.spinDeg = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    this.marginLeft = this.marginValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [15, 400, 15]
    });
  }

  onEmailChange(email) {
    this.props.updateEmail(email);
  }

  onPasswordChange(password) {
    this.props.updatePassword(password);
  }

  onLoginPressed() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onFacebookLogin() {
    this.props.socialLoginUser({ connection: 'facebook' });
  }

  onGoogleLogin() {
    this.props.socialLoginUser({ connection: 'google-oauth2' });
  }

  onLinkedInLogin() {
    this.props.socialLoginUser({ connection: 'linkedin' });
  }


  rotateButton() {
    this.spin();
  }

  spin() {
    this.spinValue.setValue(0);
    this.marginValue.setValue(0);
    Animated.parallel([
      Animated.timing(
        this.spinValue,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.ease
        }
      )
    ]).start();
  }

  renderLoginError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <Button onPress={this.onLoginPressed.bind(this)}>
        {strings('login.Login')}
      </Button>
    );
  }

  render() {
    const forwardArrow = require('../icons/forward_arrow.png');

    return (
      <View>
        <Card>
          <CodeInputTextfield
            length={10}
            onCodeChanged={(code) => {
              console.log(code);
              this.spin();
            }}
          />
          <CardSection>
            <TextfieldWithFloatingLabel
              autoCapitalize={'none'}
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <PasswordInput
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          {this.renderLoginError()}

          <CardSection>
            {this.renderButton()}
          </CardSection>
          <CardSection>
            <Button
              onPress={this.onFacebookLogin.bind(this)}
            >
              facebook
            </Button>
          </CardSection>
          <CardSection>
            <Button
              onPress={this.onGoogleLogin.bind(this)}
            >
              google
            </Button>
          </CardSection>

          <CardSection>
            <Button
              onPress={this.onLinkedInLogin.bind(this)}
            >
              linkedIn
            </Button>
          </CardSection>
        </Card>
        <Animated.View
          style={{
            justifyContent: 'center',
            paddingTop: 15,
            marginLeft: this.marginLeft
          }}
        >
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              borderColor: '#2c3e50',
              borderWidth: 1,
              backgroundColor: '#2980b9',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={this.rotateButton.bind(this)}
          >
            <Animated.Image
              source={forwardArrow}
              resizeMethod={'scale'}
              style={{ transform: [{ rotate: this.spinDeg }] }}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    fontWeight: '600',
  },
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    employees: state.employees,
  };
};

export default connect(mapStateToProps, {
  updateEmail, updatePassword, loginUser, socialLoginUser
})(LoginForm);
