import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';

import { fetchContacts } from '../actions';
import ContactsItem from './ContactsItem';

class ContactsList extends Component {
  componentWillMount() {
    this.props.fetchContacts();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // this.props still points to the old props
    this.createDataSource(nextProps);
  }

  componentWillUnmount() {
    console.log('ContactsList unmounted');
  }

  createDataSource({ contacts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(contacts);
  }

  renderRow(contact) {
    return <ContactsItem contact={contact} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  };
};
export default connect(mapStateToProps, { fetchContacts })(ContactsList);
