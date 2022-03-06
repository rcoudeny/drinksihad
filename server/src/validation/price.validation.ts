import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';



@ValidatorConstraint({ name: 'price', async: false })
export class UsernameConstraint implements ValidatorConstraintInterface {
    validate(price: number, args: ValidationArguments) {
        return price > 0 && parseFloat(price.toFixed(2)) === price; // for async validations you must return a Promise<boolean> here
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'Price should be a positive number with 2 decimals';
    }
}

export function PriceValidation(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'priceValidation',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: ValidatorConstraint
        });
    };
}

