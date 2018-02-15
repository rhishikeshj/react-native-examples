import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';
import { updateEmployee, addEmployee } from '../actions';

class EmployeeCreate extends Component {
  onEmployeeCreate() {
    const { name, phone, shift } = this.props;
    this.props.addEmployee({ name, phone, shift: shift || 'monday' });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button
            onPress={this.onEmployeeCreate.bind(this)}
          >
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return {
    name,
    phone,
    shift
  };
};

export default connect(mapStateToProps, {
  updateEmployee, addEmployee
})(EmployeeCreate);
