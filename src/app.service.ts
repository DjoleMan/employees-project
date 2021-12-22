import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomePage(): string {
    return 'Employees App - Home Page';
  }
}
