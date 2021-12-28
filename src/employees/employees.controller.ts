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
import { EmployeeDto } from './dtos/EmployeeDto';
import { EmployeesService } from './employees.service';
import { ValidateMongoIdPipe } from './pipes/ValidateMongoIdPipe';

@Controller('api/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async listEmployees(
    @Query() query: { pageSize: string; pageNumber: string },
  ) {
    const pageSize = parseInt(query.pageSize);
    const pageNumber = parseInt(query.pageNumber);
    const employees = await this.employeesService.getEmployees(
      pageSize,
      pageNumber,
    );
    if (!employees) return 'No more employees in database.';
    return employees;
  }

  @Get(':id')
  async getEmployee(@Param('id', new ValidateMongoIdPipe()) id: string) {
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
  async updateEmployee(
    @Param('id', new ValidateMongoIdPipe()) id: string,
    @Body() body: EmployeeDto,
  ) {
    const employee = await this.employeesService.updateEmployee(id, body);
    if (!employee) return 'Invalid id.';

    return employee;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id', new ValidateMongoIdPipe()) id: string) {
    const employee = await this.employeesService.deleteEmployee(id);
    if (!employee) return 'Invalid id';

    return `Employee with id ${id} is deleted`;
  }
}
