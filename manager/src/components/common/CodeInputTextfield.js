import React, { Component } from 'react';

import { CardSection } from './CardSection';
import { Textfield } from './Material';

class CodeInputTextfield extends Component {
  componentWillMount() {
    this.setState({
      code: Array(this.props.length).fill('')
    });

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  onFocus(pos) {
    if (pos === 0) {
      this.setState({
        code: Array(this.props.length).fill('')
      });
    }
  }

  onCodeInputChanged(pos, code) {
    if (code.length > 0) {
      if (pos === this.props.length - 1) {
        this.props.onCodeChanged(this.state.code.join(''));
      } else {
        this.focusNextField(pos + 1);
      }
    }
    const currentCode = this.state.code;
    currentCode[pos] = code;
    this.setState({ code: currentCode });
  }

  focusNextField(id) {
    this.inputs[`${id}`].focus();
  }

  renderCodeDigit(pos) {
    return (
      <Textfield
        textInputStyle={styles.codeInputStyle}
        style={styles.codeTextStyle}
        keyboardType={'numeric'}
        ref={input => {
          this.inputs[`${pos}`] = input;
        }}
        onChangeText={(code) => this.onCodeInputChanged(pos, code)}
        value={`${this.state.code[pos]}`}
        onFocus={this.onFocus.bind(this, pos)}
        maxLength={1}
      />
    );
  }

  renderCodeDigits() {
    let i = 0;
    const digits = [];
    for (i = 0; i < this.props.length; i++) {
        digits.push(this.renderCodeDigit(i));
    }

    return digits;
  }

  render() {
    return (
      <CardSection style={{ justifyContent: 'space-around' }}>
        {this.renderCodeDigits()}
      </CardSection>
    );
  }
}

const styles = {
  codeTextStyle: {
    width: 30,
    height: 40,
    marginTop: 15
  },
  codeInputStyle: {
    fontSize: 40
  }
};

export { CodeInputTextfield };
