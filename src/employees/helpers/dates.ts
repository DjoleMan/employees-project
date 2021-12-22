import * as moment from 'moment';

export function dateEmployment(employee) {
  if (employee.date_of_employment !== undefined) {
    let timestamp = Date.parse(employee.date_of_employment);
    return moment(timestamp).format('YYYY-MM-DD');
  }
  return moment().format('YYYY-MM-DD');
}

export function dateBirth(employee) {
  let timestamp = Date.parse(employee.date_of_birth);
  return moment(timestamp).format('YYYY-MM-DD');
}
