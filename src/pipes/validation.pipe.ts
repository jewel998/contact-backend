import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validateSync, ValidationError as SchemaError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class ValidationError extends BadRequestException {
  public error!: SchemaError[];
  constructor(error: SchemaError[]) {
    super('Validation failed');
    this.error = error;
  }
}

@Injectable()
export class ValidationPipe<T = unknown, R = unknown>
  implements PipeTransform<T, R>
{
  transform(value: T, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value as unknown as R;
    }
    const obj = plainToInstance<R, T>(metatype, value);
    const errors = validateSync(obj as object);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    return obj;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
