import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import UserHome from './components/UserHome';
import SplashForm from './components/SplashForm';

import { logoutUser } from './actions';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key={'root'} hideNavBar>
          <Scene key={'splash'}>
            <Scene key={'loading'} component={SplashForm} title={'Welcome'} initial />
          </Scene>
          <Scene key={'auth'}>
            <Scene key={'login'} component={LoginForm} title={'Login'} initial />
          </Scene>
          <Scene key={'home'}>
            <Scene key={'welcome'} component={UserHome} title={'Home'} />
          </Scene>
          <Scene key={'main'}>
            <Scene
              rightTitle={'Add'}
              onRight={() => {
                Actions.employeeCreate();
              }}
              leftTitle={'Logout'}
              onLeft={() => {
                this.props.logoutUser();
                Actions.splash();
              }}
              key={'employeeList'}
              component={EmployeeList}
              title={'Employee List'}
              initial
            />
            <Scene
              key={'employeeCreate'}
              component={EmployeeCreate}
              title={'New Employee'}
            />
            <Scene
              key={'employeeEdit'}
              component={EmployeeEdit}
              title={'Edit Employee'}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}


export default connect(null, { logoutUser })(RouterComponent);
