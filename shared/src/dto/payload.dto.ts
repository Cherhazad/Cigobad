import {Role} from "../enums";

export class UserPayloadDto {
    sub!: number
    email!: string
    role!: Role
    firstName!: string
    lastName!: string
}