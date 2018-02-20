import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { createStyle } from 'react-native-theming';

import _ from 'lodash';
import { fetchEmployees } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.fetchEmployees();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // this.props still points to the old props
    this.createDataSource(nextProps);
  }

  componentWillUnmount() {
    console.log('EmployeeList unmounted');
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
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

const styles = createStyle({
  container: {
    flex: 1,
    backgroundColor: '@backgroundColor'
  }
});

const mapStateToProps = (state) => {
  const employees = _.map(state.employees, (value, uid) => {
    return { ...value, uid };
  });

  return {
    employees
  };
};
export default connect(mapStateToProps, { fetchEmployees })(EmployeeList);
