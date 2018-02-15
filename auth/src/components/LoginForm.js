import React, { Component } from 'react';
import Firebase from 'firebase';
import { Text } from 'react-native';

import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', isLoading: false }

  onLogin() {
    this.setState({ error: '', isLoading: true });

    Firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(this.onLoginSuccess.bind(this))
    .catch(() => {
      Firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFailed.bind(this));
    });
  }

  onLoginSuccess() {
    this.setState({ error: '', isLoading: false, email: '', password: '' });
  }

  onLoginFailed() {
    this.setState({ error: 'Authentication failed!', isLoading: false });
  }

  renderButton() {
      if (this.state.isLoading) {
        return <Spinner size={'small'} />;
      }

      return (
        <Button onPress={this.onLogin.bind(this)}>
          Log in
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
          value={this.state.email}
          keyboardType={'email-address'}
          onChangeText={(email) => {
            this.setState({ email });
          }}
          />
        </CardSection>
        <CardSection>
          <Input
            label={'Password'}
            placeholder={'mypassword@1234'}
            value={this.state.password}
            secureTextEntry
            autoCapitalize={'none'}
            onChangeText={(password) => {
              this.setState({ password });
            }}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
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
    color: 'red'
  }
};
export default LoginForm;
