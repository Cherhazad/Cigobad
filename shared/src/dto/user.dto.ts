import {Category, Discount, Formula, Level, Role, SessionEnum} from "../enums";

export class UserDto {
    id!: number;
    firstName!: string;
    lastName!: string;
    birthDate!: Date;
    licenceNumber!: string;
    city!: string;
    email!: string;
    phoneNumber!: string;
    category!: Category;
    session!: SessionEnum[];
    formula!: Formula;
    discount!: Discount;
    level!: Level;
    comment!: string;
    avatar!: string;
    role!: Role;
}