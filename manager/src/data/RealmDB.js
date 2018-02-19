import { EmployeeSchema } from '../data/EmployeeModel';

const Realm = require('realm');

export default new Realm({ schema: [EmployeeSchema] });
