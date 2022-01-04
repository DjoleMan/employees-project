import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid Mongo id');
    }
    return value;
  }
}
