import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { validateId } from './middlewares/validateId';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { EmployeeSchema } from './employees.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
    MongooseModule.forRoot('mongodb://localhost/nestjs-employees'),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(validateId).forRoutes({
      path: '/api/employees/*',
      method: RequestMethod.ALL,
    });
  }
}
