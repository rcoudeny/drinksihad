import { IsNotEmpty } from "class-validator";

export class GroupDTO {
    @IsNotEmpty({ message: 'A name is required to create a group' })
    name: string;
}