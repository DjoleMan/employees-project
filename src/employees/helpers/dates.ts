import * as moment from 'moment';
import { EmployeeDto } from '../dtos/employee.dto';

export function dateEmployment(employee: EmployeeDto) {
  if (employee.date_of_employment !== undefined) {
    let timestamp = Date.parse(employee.date_of_employment);
    return moment(timestamp).format('YYYY-MM-DD');
  }
  return moment().format('YYYY-MM-DD');
}

export function dateBirth(employee: EmployeeDto) {
  let timestamp = Date.parse(employee.date_of_birth);
  return moment(timestamp).format('YYYY-MM-DD');
}
