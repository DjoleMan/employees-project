import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

const regExp = new RegExp('^[0-9]{5}$');

export function IsPostalCodeCustom(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPostalCodeCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === 'string' && regExp.test(value);
        },
      },
    });
  };
}
