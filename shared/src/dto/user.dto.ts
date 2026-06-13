import {Category, Discount, Formula, Session} from "../enums";

export class UserDto {
    firstName!: string;
    lastName!: string;
    email!: string;
    birthDate!: Date;
    phoneNumber!: string;
    category!: Category;
    session!: Session;
    formula!: Formula;
    discount!: Discount;
}