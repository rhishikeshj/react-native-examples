import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import UserHome from './components/UserHome';
import SplashForm from './components/SplashForm';
import ContactsList from './components/ContactsList';

import { logoutUser } from './actions';
import { strings } from './utils/i18n';

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
              rightTitle={strings('employeeList.Add')}
              onRight={() => {
                //Actions.employeeCreate();
                Actions.contactsList();
              }}
              leftTitle={strings('employeeList.Logout')}
              onLeft={() => {
                this.props.logoutUser();
                Actions.splash();
              }}
              key={'employeeList'}
              component={EmployeeList}
              title={strings('employeeList.EmployeeList')}
              initial
            />
            <Scene
              rightTitle={strings('contactsList.Add')}
              onRight={() => {
              }}
              key={'contactsList'}
              component={ContactsList}
              title={strings('contactsList.ContactsList')}
            />
            <Scene
              key={'employeeCreate'}
              component={EmployeeCreate}
              title={strings('employeeCreate.NewEmployee')}
            />
            <Scene
              key={'employeeEdit'}
              component={EmployeeEdit}
              title={strings('employeeEdit.EditEmployee')}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}


export default connect(null, { logoutUser })(RouterComponent);
