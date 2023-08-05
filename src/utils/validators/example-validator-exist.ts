import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { UserORM } from '../../api/user/user.entity';

async function checkAssignedToExists(id: number): Promise<boolean> {
  const user = await UserORM.findOneBy({id: id});
  if (user) {
    return true;
  }
  return false;
}

@ValidatorConstraint({ async: true })
export class UserExistsValidator implements ValidatorConstraintInterface {
  async validate(id: number, args: ValidationArguments) {
    if (!id) {
      return true;
    }

    return await checkAssignedToExists(id);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid ID for user, does not exist';
  }
}

export function IsAssignedToExists(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isUserExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserExistsValidator,
    });
  };
}