import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Theme, { createStyle } from 'react-native-theming';

import { CardSection } from './common';

class ContactsItem extends Component {
  onRowPress() {
    console.log(this.props.contact);
  }

  render() {
    const { givenName, familyName } = this.props.contact;
    console.log(styles.titleStyle);
    return (
      <TouchableWithoutFeedback
        onPress={this.onRowPress.bind(this)}
      >
        <Theme.View style={styles.container}>
          <CardSection style={{ backgroundColor: 'transparent' }}>
            <Theme.Text style={styles.titleStyle}>
              {`${givenName} ${familyName}`}
            </Theme.Text>
          </CardSection>
        </Theme.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = createStyle({
  container: {
    backgroundColor: '@backgroundColor'
  },
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: '@textColor'
  }
});

export default ContactsItem;
