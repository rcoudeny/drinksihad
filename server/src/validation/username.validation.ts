import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';



@ValidatorConstraint({ name: 'username', async: false })
export class UsernameConstraint implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return text.length > 1 && text.length < 30; // for async validations you must return a Promise<boolean> here
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'Username should be between 1 and 30 characters';
    }
}

export function UsernameValidation(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'usernameValidation',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: ValidatorConstraint
        });
    };
}
