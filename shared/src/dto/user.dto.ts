import {Category, Discount, Formula, Level, Session} from "../enums";

export class UserDto {
    id?: number;
    firstName!: string;
    lastName!: string;
    birthDate!: Date;
    licenceNumber!: string;
    city!: string;
    email!: string;
    phoneNumber!: string;
    category!: Category;
    session!: Session[];
    formula!: Formula;
    discount!: Discount;
    level!: Level;
    comment!: string;
}