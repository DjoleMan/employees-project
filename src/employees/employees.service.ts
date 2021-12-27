import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Employee } from './employees.model';
import { dateEmployment, dateBirth } from './helpers/dates';
import { EmployeeDto } from './dtos/EmployeeDto';

@Injectable()
export class EmployeesService {
  public query: { pageSize: string; pageNumber: string };
  constructor(
    @InjectModel('Employee')
    private readonly employeeModel: Model<Employee>,
  ) {}

  async getEmployees() {
    let pageSize = parseInt(this.query.pageSize);
    let pageNumber = parseInt(this.query.pageNumber);

    const employees = await this.employeeModel
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    if (employees.length === 0) return;
    return employees;
  }

  async getById(id: string) {
    const employee = await this.employeeModel.findById(id).exec();
    return employee;
  }

  async createEmployee(employee: EmployeeDto) {
    let newEmployee = new this.employeeModel({
      name: employee.name,
      email_address: employee.email_address,
      phone_number: employee.phone_number,
      home_address: {
        city: employee.home_address.city,
        zip_code: employee.home_address.zip_code,
        address_1: employee.home_address.address_1,
        address_2: employee.home_address.address_2,
      },
      date_of_employment: dateEmployment(employee),
      date_of_birth: dateBirth(employee),
    });
    newEmployee = await newEmployee.save();
    return newEmployee;
  }

  async updateEmployee(id: string, employee: EmployeeDto) {
    let updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(
        id,
        {
          name: employee.name,
          email_address: employee.email_address,
          phone_number: employee.phone_number,
          home_address: {
            city: employee.home_address.city,
            zip_code: employee.home_address.zip_code,
            address_1: employee.home_address.address_1,
            address_2: employee.home_address.address_2,
          },
          date_of_employment: dateEmployment(employee),
          date_of_birth: dateBirth(employee),
        },
        { new: true },
      )
      .exec();
    return updatedEmployee;
  }

  async deleteEmployee(id: string) {
    let employee = await this.employeeModel.findByIdAndRemove(id).exec();
    return employee;
  }
}
