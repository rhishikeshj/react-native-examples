import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';
import { updateEmployee, updateEmployeeData, deleteEmployee } from '../actions';

class EmployeeEdit extends Component {
  state = { showModal: false };
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.updateEmployee({ prop, value });
    });
  }

  onEmployeeUpdate() {
    const { name, phone, shift } = this.props;
    this.props.updateEmployeeData({ name, phone, shift, id: this.props.employee.id });
  }

  onEmployeeFire() {
    this.setState({ showModal: true });
  }

  onFireAccept() {
    this.setState({ showModal: false });
    this.props.deleteEmployee({ id: this.props.employee.id });
  }

  onFireDecline() {
    this.setState({ showModal: false });
  }

  onSendSchedule() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button
            onPress={this.onEmployeeUpdate.bind(this)}
          >
            Save
          </Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={this.onEmployeeFire.bind(this)}
            style={{ backgroundColor: 'red' }}
          >
            Fire
          </Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={this.onSendSchedule.bind(this)}
          >
            Text schedule
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onFireAccept.bind(this)}
          onDecline={this.onFireDecline.bind(this)}
        >
          Are you sure you want to fire this employee ?
        </Confirm>
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
  updateEmployee, updateEmployeeData, deleteEmployee
})(EmployeeEdit);
