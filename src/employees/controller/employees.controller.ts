import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { EmployeeDto } from '../dtos/EmployeeDto';
import { EmployeesService } from '../service/employees.service';

@Controller('api/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async listEmployees(
    @Query() query: { pageSize: string; pageNumber: string },
  ) {
    this.employeesService.query = query;
    const employees = await this.employeesService.getEmployees();
    if (!employees) return 'No more employees in database.';
    return employees;
  }

  @Get(':id')
  async getEmployee(@Param('id') id: string) {
    const employee = await this.employeesService.getById(id);
    if (!employee) return 'Employee not found.';
    return employee;
  }

  @Post()
  async insertEmployee(@Body() body: EmployeeDto) {
    const employee = await this.employeesService.createEmployee(body);
    return employee;
  }

  @Put(':id')
  async updateEmployee(@Param('id') id: string, @Body() body: EmployeeDto) {
    const employee = await this.employeesService.updateEmployee(id, body);
    if (!employee) return 'Invalid id.';

    return employee;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    const employee = await this.employeesService.deleteEmployee(id);
    if (!employee) return 'Invalid id';

    return employee;
  }
}