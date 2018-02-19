import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import AuthReducer from './AuthReducer';
import EmployeeReducer from './EmployeeReducer';
import EmployeeListReducer from './EmployeeListReducer';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['loading', 'password', 'error'],
  whitelist: ['email', 'user']
};

const authReducer = persistReducer(authPersistConfig, AuthReducer);

const rootPersistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const reducers = combineReducers({
  auth: authReducer,
  employeeForm: EmployeeReducer,
  employees: EmployeeListReducer
});

export default persistReducer(rootPersistConfig, reducers);
