import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { CardSection } from './common';

class ContactsItem extends Component {
  onRowPress() {
    console.log(this.props.contact);
  }

  render() {
    const { givenName, familyName } = this.props.contact;
    console.log(givenName);
    console.log(familyName);
    return (
      <TouchableWithoutFeedback
        onPress={this.onRowPress.bind(this)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {`${givenName} ${familyName}`}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ContactsItem;
