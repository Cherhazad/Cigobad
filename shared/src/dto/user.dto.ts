import {Category, Discount, Formula, Level, SessionEnum} from "../enums";

export class UserDto {
    readonly id!: number;
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
}