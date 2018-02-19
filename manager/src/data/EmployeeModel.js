const EmployeeSchema = {
  name: 'Employee',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', indexed: true },
    name: 'string',
    phone: 'string?',
    shift: { type: 'string', default: 'monday' }
  }
};

const ManagerSchema = {
  name: 'Manager',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', indexed: true },
    name: 'string',
    employees: 'Employee[]'
  }
};

export { EmployeeSchema, ManagerSchema };
