import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiQuery,
  ApiParam,
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { EmployeeDto } from './dtos/employee.dto';
import { Employee } from './employees.model';
import { EmployeesService } from './employees.service';
import { ValidateMongoIdPipe } from './pipes/validateMongoId.pipe';
import { PaginationQueryDto } from './dtos/paginationQuery.dto';
import { UpdateEmployeeDto } from './dtos/updateEmployee.dto';

@ApiTags('employees')
@Controller('api/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({
    summary: 'Gets all employees',
    description:
      'If you want to get paginated list of employees set query in route. Example: /api/employees/?pageLimit=3&pageNumber=1',
  })
  @ApiOkResponse({
    description: 'The resource list has been successfully returned.',
    type: [EmployeeDto],
  })
  async listEmployees(
    @Query() { pageLimit, pageNumber }: PaginationQueryDto,
  ): Promise<Employee[]> {
    const page_limit = parseInt(pageLimit);
    const page_number = parseInt(pageNumber);
    const employees = await this.employeesService.getEmployees(
      page_limit,
      page_number,
    );

    return employees;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Gets employee for given id',
    description: 'You need to provide valid Mongo id.',
  })
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
    type: EmployeeDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiParam({ name: 'id', allowEmptyValue: false })
  async getEmployee(
    @Param('id', new ValidateMongoIdPipe()) id: string,
  ): Promise<Employee> {
    const employee = await this.employeesService.getById(id);

    return employee;
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'Creates new employee.',
    description: 'Email address must be unique.',
  })
  @ApiCreatedResponse({
    description: 'The resource has been successfully created.',
    type: EmployeeDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiBody({ type: EmployeeDto })
  async insertEmployee(@Body() body: EmployeeDto): Promise<Employee> {
    const employee = await this.employeesService.createEmployee(body);

    return employee;
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'Updates employee.',
    description: `You need to provide employee's id and valid request body(only include fields you want to update)`,
  })
  @ApiOkResponse({
    description: 'The resource has been successfully updated.',
    type: UpdateEmployeeDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async updateEmployee(
    @Param('id', new ValidateMongoIdPipe()) id: string,
    @Body() body: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeesService.updateEmployee(id, body);

    return employee;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes employee from database.',
    description: `You need to provide employee's id.`,
  })
  @ApiOkResponse({
    description: 'The resource has been successfully removed.',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async deleteEmployee(
    @Param('id', new ValidateMongoIdPipe()) id: string,
  ): Promise<String> {
    const employee = await this.employeesService.deleteEmployee(id);

    return `Employee with id ${id} is deleted.`;
  }
}
