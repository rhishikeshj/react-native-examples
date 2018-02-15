import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';

import { CardSection, Input } from './common';
import { updateEmployee } from '../actions';

class EmployeeForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            value={this.props.name}
            placeholder={'John Doe'}
            label={'Name'}
            onChangeText={(text) => this.props.updateEmployee({ prop: 'name', value: text })}
          />
        </CardSection>

        <CardSection>
        <Input
          value={this.props.phone}
          placeholder={'+91xxxxxxxxxx'}
          label={'Phone'}
          keyboardType={'numeric'}
          onChangeText={(text) => this.props.updateEmployee({ prop: 'phone', value: text })}
        />
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerLabelStyle}>
            Shift
          </Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.props.shift}
            onValueChange={(shift) => this.props.updateEmployee({ prop: 'shift', value: shift })}
          >
            <Picker.Item label={'Monday'} value={'monday'} />
            <Picker.Item label={'Tuesday'} value={'tuesday'} />
            <Picker.Item label={'Wednesday'} value={'wednesday'} />
            <Picker.Item label={'Thursday'} value={'thursday'} />
            <Picker.Item label={'Friday'} value={'friday'} />
            <Picker.Item label={'Saturday'} value={'saturday'} />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return {
    name,
    phone,
    shift
  };
};
export default connect(mapStateToProps, { updateEmployee })(EmployeeForm);
