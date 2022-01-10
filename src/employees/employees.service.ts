import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './employees.model';
import { dateEmployment, dateBirth } from './helpers/dates';
import { EmployeeDto } from './dtos/employee.dto';
import { UpdateEmployeeDto } from './dtos/updateEmployee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('Employee')
    private readonly employeeModel: Model<Employee>,
  ) {}

  async getEmployees(
    pageLimit: number,
    pageNumber: number,
  ): Promise<Employee[]> {
    const employees = await this.employeeModel
      .find({ softDeleted: false })
      .skip((pageNumber - 1) * pageLimit)
      .limit(pageLimit);

    return employees;
  }

  async getById(id: string): Promise<Employee> {
    const employee = await this.employeeModel
      .findOne({ _id: id, softDeleted: false })
      .exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found.`);
    }
    return employee;
  }

  async createEmployee(employee: EmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel({
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
    })
      .save()
      .catch((err) => {
        throw new HttpException(err.message, 400);
      });

    return newEmployee;
  }

  async updateEmployee(
    id: string,
    attrs: Partial<UpdateEmployeeDto>,
  ): Promise<Employee> {
    try {
      const employee = await this.employeeModel.findById(id);
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found.`);
      }
      if (attrs.home_address) {
        for (let key in attrs.home_address) {
          employee.home_address[key] = attrs.home_address[key];
        }
        delete attrs.home_address;
      }
      Object.assign(employee, attrs);

      return await employee.save();
    } catch (ex) {
      return ex.message;
    }
  }

  async deleteEmployee(id: string): Promise<Employee> {
    const employee = await this.employeeModel
      .findByIdAndUpdate(id, { softDeleted: true })
      .exec();
    if (!employee) {
      throw new NotFoundException(`Employee with given ID ${id} not found.`);
    }
    return employee;
  }
}
