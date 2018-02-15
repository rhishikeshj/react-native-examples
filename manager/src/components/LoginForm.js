import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner
} from './common';
import {
  updateEmail,
  updatePassword,
  loginUser
} from '../actions';

class LoginForm extends Component {
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
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label={'Email'}
            placeholder={'user@example.com'}
            autoCapitalize={'none'}
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label={'Password'}
            placeholder={'password'}
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderLoginError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    fontWeight: '600',
  }
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {
  updateEmail, updatePassword, loginUser
})(LoginForm);